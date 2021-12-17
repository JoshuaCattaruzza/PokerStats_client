import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { getData } from "../actions/data";

const LogIn = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const handleLogin = (e) => {
		e.preventDefault();

		dispatch(login(username, password));

	};
	useEffect(() => {
		dispatch(getData());
	}, [dispatch])

	return (
		<Form>
			<Form.Group className="mb-3" controlId="username">
				<Form.Label>Email address</Form.Label>
				<Form.Control
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</Form.Group>
			<Form.Group className="mb-3" controlId="password">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</Form.Group>
			<Form.Group className="mb-3" controlId="signup">
				<Link to="/signup">
					<Form.Label>Registrati</Form.Label>
				</Link>
			</Form.Group>
			<Form.Group className="mb-3" controlId="login">

				<Button variant="dark" type="submit" onClick={(e) => handleLogin(e)}>
					<Link to="/home" style={{ textDecoration: 'none', color: "white" }}>
						Log In
					</Link>

				</Button>

			</Form.Group>
		</Form>

	);
};
export default LogIn;
