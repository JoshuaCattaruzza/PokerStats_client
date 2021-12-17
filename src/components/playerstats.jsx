import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';

import { useSelector, } from 'react-redux';

const PlayerStats = () => {
    const { data: games } = useSelector((state) => state.data);
    const [playerGame, setPlayerGame] = useState([]);
    const { user: currentUser } = useSelector((state) => state.auth);

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };
    function filterGames(games, user) {
        var totalStacks = [];
        var filteredGames = {
            keys: [],
            game_names: [],
            labels: [],
            data: [],
            background: [],
            total_profit: []
        }
        var endDate = [];
        var totalAddon = 0;
        var totalProfit = 0;
        games.forEach(game => {
            if (game.end === null) {
                endDate.push("in corso");

            } else {
                var date = new Date(game.end);
                var month = date.getMonth();
                var day = date.getDate();
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var convertedDate = day + "/" + month + " " + hours + ":" + minutes;
                endDate.push(convertedDate);
            }
            var players = game.players;

            players.forEach(player => {
                if (player.username === user.username) {

                    player.addons.forEach(addon => {

                        totalAddon = totalAddon + addon;

                    });

                    if ((player.finishing_stack - (totalAddon + player.starting_stack)) > 0) {
                        filteredGames.background.push("rgba(75, 192, 192, 1)");

                    } else {
                        filteredGames.background.push("rgba(255, 99, 132, 1)");

                    }
                    totalProfit = totalProfit + (player.finishing_stack - (totalAddon + player.starting_stack));
                    totalStacks.push(player.finishing_stack - (totalAddon + player.starting_stack));
                    totalAddon = 0;
                }

            });
            filteredGames.data = totalStacks;
            filteredGames.labels = endDate;
            filteredGames.keys.push(game._id);
            filteredGames.game_names.push(game.name);

        });

        filteredGames.total_profit.push(totalProfit);
        setPlayerGame(filteredGames);

        endDate = [];
        totalStacks = [];
        filteredGames = {
            keys: [],
            labels: [],
            data: [],
            background: [],
            game_names: [],
            total_profit: []
        }

    };
    useEffect(() => {
        filterGames(games, currentUser);
    }, [games, currentUser]);


    return (
        <>

            <Line
                // height={400}
                // width={600}
                data={{
                    labels: playerGame.labels,
                    datasets: [{
                        label: "Cashout ultime partite",
                        data: playerGame.data,
                        backgroundColor: playerGame.background,
                        borderColor: "rgb(169,169,169)",
                        borderWidth: 1
                    }]
                }}
                options={options} />
            <Bar
                // height={400}
                // width={600}
                data={{
                    labels: playerGame.total_profit,
                    datasets: [{
                        label: "Utile/perdita",
                        data: playerGame.total_profit,
                        backgroundColor: "rgba(169,169,169, 0.2)",
                        borderColor: "rgba(169,169,169, 1)",
                        borderWidth: 1
                    }]
                }}
                options={{
                    scaleShowLabels : false,
                    plugins: {
                        title: {
                            display: true,
                            text: "Totale: " + playerGame.total_profit + "€"
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        },
                        // x: [{
                        //     ticks: {
                        //         display: false //this will remove only the label
                        //     }
                        // }]

                    }
                }} />
        </>

    )
}
export default PlayerStats;