import React, {useEffect, useState} from 'react';
import { useSelector, } from 'react-redux';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
// import config from 'config';
import { withRouter } from "react-router-dom";

const OldGames = () =>{
    const [games, setGames] = useState([]);
    const { user: currentUser } = useSelector((state) => state.auth);
    const [show, setShow] = useState(false);
	const [selectedGame, setSelectedGame] = useState({});

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = (game) => {
        setShow(true)
        setSelectedGame(game);
    };

    useEffect(() => {
        fetch(`${config.apiUrl}/game`)
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

    const deleteGame = (e, id)=>{
        e.preventDefault();
        console.log(id);
        fetch("http://localhost:4200/game/" + id, {
            method: "DELETE"
        }).then(()=>{
            const updatedGames = games.filter(game=> game._id !== id);
            setGames(updatedGames);
            setShow(false);
        })
    }
    return (
        <>
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
                    <ListGroup.Item>Luogo: {game.location}</ListGroup.Item>
                    <ListGroup.Item>Giocatori: {game.players.length}</ListGroup.Item>
                </ListGroup>
                <Button variant="dark" type="submit" onClick={()=>{handleShow(game)}}>
                    Elimina partita
                </Button>
                </Card>
                )})
            )
        }
        </>
        <>           
        <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
            <Modal.Title>Sei sicuro di voler eliminare questa partita: {selectedGame.name}</Modal.Title>
        </Modal.Header>
        <Form className={"p-3"}>
            <Form.Group className="mb-3">
                <Button variant="dark" type="submit" onClick={(e)=>deleteGame(e, selectedGame._id)} >
                    Elimina
                </Button>
            </Form.Group>
        </Form>
    </Modal>
        </>
        </>
        
    )
}
export default withRouter(OldGames); 