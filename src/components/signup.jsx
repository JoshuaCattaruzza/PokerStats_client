import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { signup } from '../actions/auth';
import {withRouter} from "react-router-dom";

const SignUp = (props) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [passwordconfirm, setPasswordconfirm] = useState('');
	const dispatch = useDispatch();

	const checkPassword = (e) => {
		e.preventDefault();
		if (password === passwordconfirm && password !== '') {
			handleRegister(e);
			console.log(username, password, passwordconfirm);
		} else {
			console.log('passwords do not match');
		}
	};
	const handleRegister = (e) => {
		e.preventDefault();
		dispatch(signup(username, password));
		props.history.push('/login');
	};

	return (
		<Form >
			<Form.Group className="mb-3" controlId="username">
				<Form.Label>Crea username</Form.Label>
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
			<Form.Group className="mb-3" controlId="passwordConfirm">
				<Form.Label>Conferma password</Form.Label>
				<Form.Control
					type="password"
					placeholder="Conferma password"
					value={passwordconfirm}
					onChange={(e) => setPasswordconfirm(e.target.value)}
				/>
			</Form.Group>
			<Form.Group className="mb-3" controlId="passwordConfirm">
				<Button variant="dark" type="submit" onClick={(e)=>checkPassword(e)}>
					Registrati
				</Button>
			</Form.Group>
		</Form>
	);
};
export default withRouter(SignUp);
