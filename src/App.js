import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import {TodoApp} from "./TodoApp";
import {Login, fakeAuth, AuthButton} from "./Login";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends Component {
	
	constructor(props){
		super(props);
		this.state = {isLoggedIn: localStorage.getItem('isLoggedIn') || false}
	}
	
  render() {
	return (
		<Router>
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo"/>
					<h1 className="App-title">TODO React App</h1>
				</header>
				<AuthButton />
				<ul>
					<li>
						<Link to="/login">Login</Link>
					</li>
					<li>
						<Link to="/todo">Todo</Link>
					</li>
				</ul>
				<Route path="/login" component={Login} />
				<PrivateRoute path="/todo" component={TodoApp} />
			</div>
		</Router>
	);
  }
}


export default App;
