import React, { useState, useEffect} from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector, } from 'react-redux';
import { withRouter } from "react-router-dom";
const Stats = () => {

    const { data: games } = useSelector((state) => state.data);
    const [gameList, setGameList] = useState([]);
    // const { user: currentUser } = useSelector((state) => state.auth);

    
    const options = {
        plugins: {
        title: {
            display: true,
            // text: "Cash out partita"
           }},
        scales: {
            y: {
                beginAtZero: true
            }
        },
        maintainAspectRatio: false
    };

    function filterGames(games){
        var returnArr = [];
        var totalStacks = [];
        var filteredGames = {
            key: "",
            game_name: "",
            labels: [],
            data: [],
            background: [],
            border: []
        }
        var labelsPlayers = [];
        var totalAddon = 0;
        var playerAddon;

        games.forEach(game => {
            if (game.active === true) {
                var players = game.players;

                        players.forEach(player => {
                            playerAddon = player.addons;
                            playerAddon.forEach((addon) => {
                                totalAddon = totalAddon + addon;
                            })
        
                            totalStacks.push(player.finishing_stack - (totalAddon + player.starting_stack));
                            
                            labelsPlayers.push(player.username);
                            if((player.finishing_stack - (totalAddon + player.starting_stack))>0){
                                filteredGames.background.push("rgba(75, 192, 192, 0.2)");
                                filteredGames.border.push("rgba(75, 192, 192, 1)");
                            }else{
                                filteredGames.background.push("rgba(255, 99, 132, 0.2)");
                                filteredGames.border.push("rgba(255, 99, 132, 1)");
                            }
                            totalAddon = 0;
                        });

                filteredGames.data.push(totalStacks);
                filteredGames.labels.push(labelsPlayers);
                filteredGames.key =game._id;
                filteredGames.game_name =game.name;
                returnArr.push(filteredGames);
                
                labelsPlayers = [];
                totalStacks = [];
                filteredGames = {
                    key: "",
                    labels: [],
                    data: [],
                    background: [],
                    border: []
                }
            }
        });
        setGameList(returnArr);
    };


    useEffect(()=>{
        filterGames(games);
    }, [games]);
    
    return (
        <>
            {gameList && gameList.map((game) => {
                return(
                <div key={game.key}>
                <Bar
                    height={400}
                    width={600}
                    data={{
                        labels: game.labels[0],
                        datasets: [{
                            label: game.game_name,
                            data: game.data[0],
                            backgroundColor: game.background,
                            borderColor: game.border,
                            borderWidth: 1
                        }]
                    }}
                    options={options} /></div>
                     )
            })} 

        </>
    );
}
export default withRouter(Stats);



