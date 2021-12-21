import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack'
import { Router, Route, Switch } from 'react-router-dom';
import NavBar from './common/navbar';
import NewGame from './components/newgame';
import Home from './components/home';
import JoinGame from './components/joingame';
import OldGames from './components/oldgames';
import LogIn from './components/login';
import PlayerStats from './components/playerstats';
import Stats from './components/stats';
import SignUp from './components/signup';
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
