import React, {useEffect, useState} from 'react';
import { useSelector, } from 'react-redux';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/Button";
const OldGames = () =>{
    const [games, setGames] = useState([]);
    const { user: currentUser } = useSelector((state) => state.auth);
    console.log(currentUser.id)
    useEffect(() => {
        fetch("http://localhost:4200/game")
        .then((res) =>{
            return res.json();
        }).then((data) =>{
            const oldGames = [];
            data.forEach(game => {
                game.players.forEach(player =>{
                    if(game.active === false && player._id === currentUser.id){
                        oldGames.push(game);
                       }
                })
  
            });
            setGames(oldGames);
        })
    }, [currentUser])

    console.log(games)
    const deleteGame = (id)=>{
        fetch("http://localhost:4200/game/" + id, {
            method: "DELETE"
        }).then(()=>{
            const updatedGames = games.filter(game=> game._id !== id);
            setGames(updatedGames);
        })
    }
    return (
        <>
        {
            games.length === 0 ? (
                <Card className={'m-2'}>
                <Card.Header>
                    Non hai partecipato a nessuna partita
                </Card.Header>
            </Card>
            ) : (
                games && games.map(game => {
                    return(
                <Card className={"m-2"} key={game._id} >
                <Card.Header>{game.name}</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                    Inzio: {game.start}
                    </ListGroup.Item>
                    <ListGroup.Item>
                    Fine: {game.end}
                    </ListGroup.Item>
                    <ListGroup.Item>Blinds: {game.blinds}€</ListGroup.Item>
                    <ListGroup.Item>Luogo: {game.locatiom}</ListGroup.Item>
                    <ListGroup.Item>Giocatori: {game.players.length}</ListGroup.Item>
                </ListGroup>
                <Button variant="dark" type="submit" onClick={()=>deleteGame(game._id)}>
                    Elimina partita
                </Button>
                </Card>
                )})
            )

        }
        
        </>
        
    )
}
export default OldGames; 