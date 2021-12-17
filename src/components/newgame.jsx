import React, { useState, } from 'react';
import Form from 'react-bootstrap/Form'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from "react-bootstrap/Button";
import { useSelector } from 'react-redux';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';


const NewGame = (props) => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [blinds, setBlinds] = useState("");
    const [buyin, setBuyin] = useState(0);
    const [created, setCreated] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);
    const createGame = (e) => {
        e.preventDefault();
        //DA SISTEMARE CASTING DATE BISOGNA SALVARE I DATI E CONVERTIRLI NELLA FRONTEND
        // var options = { minute: '2-digit', hour: '2-digit'};
        // // var today = new Date();
        // const startDate = today.toLocaleDateString("it-IT", options)
        const startDate = new Date();
        const game = {
            player: {
                _id: currentUser.id,
                username: currentUser.username,
                starting_stack: buyin,
                in_game: true,
                finishing_stack: null
            }, name, location, blinds, start: startDate, end: null, active: true
        };
        console.log(game);
        fetch("http://localhost:4200/game", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(game)
        })

    }
    const handleSelect = (e) => {
        setBlinds(e);
    }
    return (
        <Form >
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nome della partita</Form.Label>
                <Form.Control type="text" placeholder="Inserisci nome" value={name} onChange={(e) => setName(e.target.value)} />
                {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text> */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="location">
                <Form.Label>Luogo</Form.Label>
                <Form.Control type="text" placeholder="Inserisci luogo" value={location} onChange={(e) => setLocation(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="blinds">
                <Form.Label>Seleziona BB</Form.Label>
                <DropdownButton variant="dark" title={blinds} value={blinds} onSelect={handleSelect} >
                    <Dropdown.Item eventKey="0.50">0.50€</Dropdown.Item>
                    <Dropdown.Item eventKey="1">1€</Dropdown.Item>
                    <Dropdown.Item eventKey="2">2€</Dropdown.Item>
                </DropdownButton>
            </Form.Group>
            <InputGroup className="mb-2">
                <FormControl id="inlineFormInputGroup" placeholder="Importo" onChange={(e) => setBuyin(parseInt(e.target.value))} />
                <InputGroup.Text>€</InputGroup.Text>
            </InputGroup>

            <Button as={Link} to="/home" variant="dark" type="submit" onClick={(e) => { createGame(e); setCreated(true) }} >
                Crea partita
            </Button>
            {created ? (<Alert variant="success">
                Pertita creata!
            </Alert>) : null}
        </Form>
    )
}
export default NewGame;