import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { ReactComponent as Logo } from '../assets/logo-mobile.svg';
import { Link } from 'react-router-dom';
import { logout } from '../actions/auth.js';
import { useDispatch, useSelector } from 'react-redux';

const NavBar = () => {
	const { isLoggedIn } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const handleLogout = () => {
		dispatch(logout());
	};
	return (
		<>
			<Navbar expand="lg" bg="dark" variant="dark" fixed="top">
				<Container >
					<Navbar.Brand as={Link} to="/home">
						<Logo />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							{!isLoggedIn ? (
								<Nav.Link collapseOnSelect="true" as={Link} to="/login">
									Login
								</Nav.Link>
							) : (
								<Nav.Link onClick={handleLogout}>Logout</Nav.Link>
							)}
							{!isLoggedIn ? (
							<Nav.Link collapseOnSelect="true" as={Link} to="/signup">Registrati</Nav.Link>
							): null}
							<Nav.Link collapseOnSelect="true" as={Link} to="/playerstats">Statistiche personali</Nav.Link>
							<Nav.Link collapseOnSelect="true" as={Link} to="/stats">Statistiche partite</Nav.Link>
							<NavDropdown title="Partite" >
								<NavDropdown.Item as={Link} to="/newgame">
									Crea Partita
								</NavDropdown.Item>
								<NavDropdown.Item as={Link} to="/joingame">
									Unisciti
								</NavDropdown.Item>
								<NavDropdown.Item  as={Link} to="/oldgames">
									Storico Partite
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};
export default NavBar;
