import React, { useEffect, useState } from 'react'
import { useSelector, } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { getData } from "../actions/data";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Badge from "react-bootstrap/Badge";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Settings from '../assets/settings.png';

// import FormControl from 'react-bootstrap/FormControl';
// import InputGroup from 'react-bootstrap/InputGroup';
//DA FILTRARE I GIOCATORI CHE SONO NELLA PARTITA E QUELLI CHE HANNO ABBANDONATO, ANCHE NELLA SEZIONE STATISTICHE 

const Home = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);
    const { data: games } = useSelector((state) => state.data);
    const [user, setUser] = useState({});
    const [show, setShow] = useState(false);
    const [showLeave, setShowLeave] = useState(false);
    const [showAddon, setShowAddon] = useState(false);
    const [closed, setClosed] = useState(false);
    const [addOn, setAddon] = useState(0);
    // const [totalCash, setTotalCash] = useState(0);
    const [finishingStack, setFinishingStack] = useState(0);
    // const dispatch = useDispatch();
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true)
    };
    const handleCloseAddon = () => {
        setShowAddon(false);
    }
    const handleShowAddon = () => {
        setShowAddon(true)
    };
    const handleCloseLeave = () => {
        setShowLeave(false);
    }
    const handleShowLeave = () => {
        setShowLeave(true)
    };
    useEffect(() => {
        if (currentUser) {
            setUser(currentUser);
            setIsLoading(false);
            checkAdmin(games, user);
            // totalCashInPlay(joinedGames.players);
            // dispatch(getData());


        } else {
            window.location.reload();
        }


    }, [currentUser, games, user])

    // const totalCashInPlay = (game) => {
    //     console.log(game)
    //     var totalAddon = 0;
    //     var cashInPlay = 0;
    //     if (game.length >= 0) {
    //         game.players.forEach(player => {
    //             player.addons.forEach(addon => {
    //                 totalAddon = totalAddon + addon;
    //             });
    //             cashInPlay += totalAddon + player.starting_stack;
    //         });
    //         setTotalCash(cashInPlay);
    //     }

    // }

    const filterGames = (games, user) => {
        var returnObj = {};
        games.forEach(game => {
            if (game.active === false)
                return returnObj;
            // var date = new Date(game.start);
            // var year = date.getFullYear();
            // var month = date.getMonth();
            // var day = date.getDate();
            // var hours = date.getHours();
            // var minutes = date.getMinutes();
            // var convertedDate = "";
            // convertedDate = day + "/" + month + "/" + year + " " + hours + ":" + minutes;
            // console.log(convertedDate);
            // game.start = convertedDate.toString();

    
            var id = user.id;
            var players = game.players;
            
            
            players.forEach(player => {
                if (player._id === id && player.in_game === true) {

                    returnObj = game;

                }

            });
           
        });
        
        // setTotalCash(cashInPlay);
        // totalCashInPlay(returnObj)
        return returnObj;

    }
    const checkAdmin = (games, user) => {
        games.forEach(game => {
            var id = user.id;
            var admin = game.created_by
            if (id === admin) {
                setIsAdmin(true)
            } else {
                setIsAdmin(false);
            }
        });
    }
    const closeGame = (e, user_id, id) => {
        e.preventDefault();
        var body = { _id: user_id, finishing_stack: finishingStack }
        setIsLoading(true);
        fetch("http://localhost:4200/game/close/" + id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        }).then(() => {
            handleCloseLeave(); setIsLoading(false); setClosed(true); window.location.reload();
        })

    }
    const insertaddOn = (e, user_id, id) => {
        e.preventDefault();
        setIsLoading(true);
        var body = { user_id, addOn };
        console.log(body)
        fetch("http://localhost:4200/game/addon/" + id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }).then(() => { handleCloseAddon(); setIsLoading(false); setClosed(true); window.location.reload(); })
    }
    const leaveGame = (e, user_id, id) => {
        setIsLoading(true);
        var body = { _id: user_id, finishing_stack: finishingStack }
        e.preventDefault();
        fetch("http://localhost:4200/game/leave/" + id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),

        }).then(() => { handleCloseLeave(); setIsLoading(false); window.location.reload(); })

    }
    const joinedGames = filterGames(games, user);
    const activePlayers = joinedGames.players;



    return (
        <>
            {isLoading ? (<Spinner animation="grow" />) : joinedGames.active ? (
                <>
                    <Card className={'m-2'} key={joinedGames._id} >

                        <Card.Header>
                            Benvenuto {currentUser.username}, al momento stai partecipando alla partita
                        </Card.Header>

                        <Card.Header>
                            {joinedGames.name}
                            <svg className="blinking m-2">
                                <circle cx="10" cy="10" r="10" fill="red" />
                            </svg>
                            {isAdmin ? (<img alt="settings" style={{ float: "right" }} onClick={handleShow} src={Settings} />) : null}
                        </Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Inzio: {joinedGames.start}</ListGroup.Item>
                            {/* <ListGroup.Item>Fine: {joinedGames.end}</ListGroup.Item> */}
                            <ListGroup.Item>Blinds: {joinedGames.blinds}€</ListGroup.Item>
                            <ListGroup.Item>Luogo: {joinedGames.location}</ListGroup.Item>
                            {/* <ListGroup.Item>
                                <Badge bg="secondary" pill>
                                    Soldi in gioco: {totalCash}€
                                </Badge>
                            </ListGroup.Item> */}
                            <ListGroup.Item>
                                Giocatori:  <ListGroup as="ul">{activePlayers !== undefined && activePlayers.map((player) => {
                                    var playerAddon = player.addons;
                                    var totalAddon = 0;
                                    playerAddon.forEach((addon) => {
                                        totalAddon = totalAddon + addon;
                                    })
                                    return (
                                        <ListGroup.Item className="d-flex justify-content-between align-items-start" variant="secondary" as="li" key={player._id} >
                                            {player.username}
                                            {player.in_game ? (<Badge bg="danger" pill>
                                                {player.starting_stack + totalAddon}€
                                            </Badge>) : (<Badge bg="secondary" pill>
                                                Cash out: {player.finishing_stack - (totalAddon + player.starting_stack)}€
                                            </Badge>)}

                                        </ListGroup.Item>)

                                })}</ListGroup>
                            </ListGroup.Item>
                        </ListGroup>
                        {isAdmin ? (<Button variant="danger" type="submit" onClick={handleShowAddon}>
                            Add on
                        </Button>) : (<><Button variant="dark" type="submit" onClick={handleShowLeave}>
                            Abbandona
                        </Button>
                            <Button variant="danger" type="submit" onClick={handleShowAddon}>
                                Add on
                            </Button></>)}


                    </Card>


                </>
            ) : (<>
                <Card className={'m-2'} key={joinedGames._id}>
                    <Card.Header>
                        Benvenuto {currentUser.username}, al momento non stai partecipando a una partita
                    </Card.Header>
                </Card>
            </>)}
            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Gestisci partita</Modal.Title>
                </Modal.Header>
                <Form className={"p-3"}>
                    <Form.Group className="mb-3" >
                        <InputGroup className="mb-2">
                            <FormControl id="inlineFormInputGroup" placeholder="inserisci importo finale..." onChange={(e) => setFinishingStack(parseInt(e.target.value))} />
                            <InputGroup.Text>€</InputGroup.Text>
                        </InputGroup>
                        <Button variant="dark" type="submit" onClick={(e) => { closeGame(e, currentUser.id, joinedGames._id) }} >
                            Chiudi partita
                        </Button>
                        {closed ? (<Alert variant="danger">
                            Pertita chiusa!
                        </Alert>) : null}
                    </Form.Group>
                </Form>
            </Modal>
            <Modal show={showLeave} onHide={handleCloseLeave} aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Inserisci importo finale</Modal.Title>
                </Modal.Header>
                <Form className={"p-3"}>
                    <InputGroup className="mb-2">
                        <FormControl id="inlineFormInputGroup" placeholder="Importo" onChange={(e) => setFinishingStack(parseInt(e.target.value))} />
                        <InputGroup.Text>€</InputGroup.Text>
                    </InputGroup>
                    <Form.Group className="mb-3" >
                        <Button variant="dark" type="submit" onClick={(e) => { leaveGame(e, currentUser.id, joinedGames._id) }} >
                            Esci dalla partita
                        </Button>
                    </Form.Group>
                </Form>
            </Modal>
            <Modal show={showAddon} onHide={handleCloseAddon} aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Inserisci importo</Modal.Title>
                </Modal.Header>
                <Form className={"p-3"}>
                    <InputGroup className="mb-2">
                        <FormControl id="inlineFormInputGroup" placeholder="Importo" onChange={(e) => { setAddon(parseInt(e.target.value)) }} />
                        <InputGroup.Text>€</InputGroup.Text>
                    </InputGroup>
                    <Form.Group className="mb-3" controlId="joinGame">
                        <Button variant="dark" type="submit" onClick={(e) => { insertaddOn(e, currentUser.id, joinedGames._id) }} >
                            Addon
                        </Button>
                    </Form.Group>
                </Form>
            </Modal>
        </>
    )
}
export default Home;