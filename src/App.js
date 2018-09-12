import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import TodoApp from "./TodoApp";
import Login from "./Login";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('isLoggedIn') ? (
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

const LoginView = () => (
	<Login />
);

const TodoAppView = () => (
	<TodoApp />
);

class App extends Component {
	
	constructor(props){
		super(props);
		this.state = {isLoggedIn: localStorage.getItem('isLoggedIn') || false}
	}
	
  render() {
	return (
		<BrowserRouter>
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo"/>
					<h1 className="App-title">TODO React App</h1>
				</header>
				<div>
					<Route path="/login" component={LoginView} />
					<PrivateRoute exact path="/" component={TodoAppView} />
				</div>
			</div>
		</BrowserRouter>
	);
  }
}


export default App;
