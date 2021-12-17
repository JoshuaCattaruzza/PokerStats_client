import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import '../style/joingame.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import { useSelector } from 'react-redux';
import {withRouter} from "react-router-dom";
// import { Link } from 'react-router-dom';
//DA SISTEMARE REDIRECT SOLO SE IL PLAYER NON E GIA NELLA PARTITA
import Alert from 'react-bootstrap/Alert';


const JoinGame = (props) => {
	const [show, setShow] = useState(false);
	const [buyin, setBuyin] = useState(0);
	const [selectedGame, setSelectedGame] = useState({});
	const { user: currentUser } = useSelector((state) => state.auth);
	const [inGame, setInGame] = useState(false);
	const games = props.games;
	const handleClose = () => setShow(false);
	const handleShow = (game) => {
		setShow(true)
		setSelectedGame(game);
	};
	const filterGames = (games) => {
		const returnArr = [];
		games.forEach(game => {
			if (game.active === true) {
				returnArr.push(game)
			}
		});
		return returnArr;
	}
	const activeGames = filterGames(games);
	const checkPlayer = (game, user) => {

		game.players.forEach(player => {
			if (player._id === user.id) {
				setInGame(true);
			}

		});
	}
	const addPlayer = (id, e) => {
		e.preventDefault()

		// handleClose();
		var data = {
			_id: currentUser.id,
			username: currentUser.username,
			starting_stack: buyin,
			in_game: true
		}
		fetch('http://localhost:4200/game/join/' + id, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		}).then((response) => {
			if(response.status === 200){
				props.history.push('/home');
				window.location.reload();

			}
		})


	};
	return (
		<>
			{activeGames && activeGames.map((game) => {
				return (

					<Card className={'m-2'} key={game._id} >
						<Card.Header>
							{game.name}
							<svg className="blinking m-2">
								<circle cx="10" cy="10" r="10" fill="red" />
							</svg>
						</Card.Header>
						<ListGroup variant="flush">
							<ListGroup.Item>Inzio: {game.start}</ListGroup.Item>
							<ListGroup.Item>Fine: {game.end}</ListGroup.Item>
							<ListGroup.Item>Blinds: {game.blinds}€</ListGroup.Item>
							<ListGroup.Item>Luogo: {game.location}</ListGroup.Item>
							<ListGroup.Item>
								Giocatori: {game.players.length}
							</ListGroup.Item>
						</ListGroup>
						<Button variant="dark" type="submit" onClick={() => handleShow(game)}>
							Unisciti
						</Button>

					</Card>
				);
			})}
			<Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
				centered>
				<Modal.Header closeButton>
					<Modal.Title>Ti stai per unire a {selectedGame.name}</Modal.Title>
				</Modal.Header>
				<Form className={"p-3"}>
					<InputGroup className="mb-2">
						<FormControl id="inlineFormInputGroup" placeholder="Importo" onChange={(e) => setBuyin(parseInt(e.target.value))} />
						<InputGroup.Text>€</InputGroup.Text>
					</InputGroup>
					<Form.Group className="mb-3" controlId="joinGame">
						<Button variant="dark" type="submit" onClick={(e) => { addPlayer(selectedGame._id, e); checkPlayer(selectedGame, currentUser) }}>
							Unisciti alla partita
						</Button>
						{inGame ? (<Alert variant="danger">
							Stai già partecipando a questa partita!
						</Alert>) : null}
					</Form.Group>
				</Form>
			</Modal>
		</>
	);
};
export default withRouter(JoinGame);
