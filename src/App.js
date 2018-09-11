import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import {TodoApp} from "./TodoApp";
import {Login} from "./Login";

const LoginView = () => (
	<Login/>
);

const TodoAppView = () => (
	<TodoApp/>
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('isLoggedIn') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends Component {

    constructor(props) {
        super(props);
		this.state = {isLoggedIn: localStorage.getItem('isLoggedIn') || false, emailTest: 'camilo', passTest: 'torres'};
    }

	handleLoginSubmit(e) {
		e.preventDefault();
		if(localStorage.getItem('email') === this.state.emailTest && localStorage.getItem('pass') === this.state.passTest){
			localStorage.setItem('isLoggedIn', true);
		}
    }

    render() {

        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">TODO React App</h1>
                    </header>
                    <br/>
                    <br/>
                    <ul>
                        <li><Link to="/">Login</Link></li>
                        <li><Link to="/todo">Todo</Link></li>
                    </ul>
                    <div>
                        <Route exact path="/" component={LoginView}/>
						<PrivateRoute path="/todo" component={TodoAppView}/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
