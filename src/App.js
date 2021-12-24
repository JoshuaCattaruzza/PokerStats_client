import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack'
import { Router, Route, Switch } from 'react-router-dom';
import NavBar from './common/navbar.jsx';
import NewGame from './components/newgame.jsx';
import Home from './components/home.jsx';
import JoinGame from './components/joingame.jsx';
import OldGames from './components/oldgames.jsx';
import LogIn from './components/login.jsx';
import PlayerStats from './components/playerstats.jsx';
import Stats from './components/stats.jsx';
import SignUp from './components/signup.jsx';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { history } from './helpers/history';
import { clearMessage } from './actions/message';
import {getData} from "./actions/data";
function App() {

	const { isLoggedIn } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const { data: games } = useSelector((state) => state.data);
	
	useEffect(()=>{
		dispatch(getData());
	},[dispatch])

	useEffect(() => {
		history.listen((location) => {
			dispatch(clearMessage()); 
		});
	}, [dispatch]);

	return (
		<Router history={history}>
			<NavBar></NavBar>
			<Container className="p-3" fluid="md" style={{marginTop: "100px"}}>
				<Stack gap={3}>
				{!isLoggedIn ? (
					<>
					<Switch>
						<Route exact path="/login">
							<LogIn />
						</Route>
					</Switch>
					<Switch>
							<Route exact path="/signup">
								<SignUp />
							</Route>
						</Switch>
						</>
				) : (
					<>
						<Switch>
							<Route exact path="/home">
								<Home />
							</Route>
						</Switch>
						<Switch>
							<Route exact path="/newgame">
								<NewGame />
							</Route>
						</Switch>
						<Switch>
							<Route exact path="/joingame">
								<JoinGame games={games} />
							</Route>
						</Switch>
						<Switch>
							<Route exact path="/oldgames">
								<OldGames />
							</Route>
						</Switch>
						<Switch>
							<Route exact path="/playerstats">
								<PlayerStats />
							</Route>
						</Switch>
						<Switch>
							<Route exact path="/stats">
								<Stats />
							</Route>
						</Switch>
					</>
				)}
				</Stack>
			</Container>
		</Router>
	);
}

export default App;
