import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './Login.css'

const emailTest = "camilo";
const passTest = "torres";

export const fakeAuth = {
  isAuthenticated: localStorage.getItem('isLoggedIn') || false,
  authenticate(cb, email, pass) {
    if(email === emailTest && pass === passTest){
		this.isAuthenticated = true;
		localStorage.setItem('isLoggedIn', true);
		setTimeout(cb, 100); // fake async
	}
  },
  signout(cb) {
    this.isAuthenticated = false;
	localStorage.setItem('isLoggedIn', false);
    setTimeout(cb, 100);
  }
};

export const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
);

export class Login extends React.Component{

	constructor(props){
		super(props);
		this.state = {email: '', pass: ''};
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePassChange = this.handlePassChange.bind(this);
	}
	
	state = {
		redirectToReferrer: false
	};
	
	login = () => {
		fakeAuth.authenticate(() => {
			this.setState({ redirectToReferrer: true });
		}, this.state.email, this.state.pass);
	};
	
    render(){
		const { from } = this.props.location.state || { from: { pathname: "/" } };
		const { redirectToReferrer } = this.state;

		if (redirectToReferrer) {
			return <Redirect to={from} />;
		}

		let signinform = (
            <React.Fragment>
                <CssBaseline />
                <main className="layout">
                    <Paper className="paper">
                        <Avatar className="avatar">
                            <LockIcon />
                        </Avatar>
                        <Typography variant="headline">Sign in</Typography>					
                        <form onSubmit={this.login} className="form">
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email Address (camilo)</InputLabel>
                                <Input 
									id="email" 
									name="email" 
									autoComplete="email" 
									autoFocus 
									onChange={this.handleEmailChange}
			                    />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password (torres)</InputLabel>
                                <Input
                                    name="password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
									onChange={this.handlePassChange}
			                        value={this.state.pass}
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="raised"
                                color="primary"
                                className="submit"
                            >
                                Sign in
                            </Button>
                        </form>
                    </Paper>
                </main>
            </React.Fragment>
        );
        

		return signinform;
    }

	handleEmailChange(e) {
        this.setState({
            email: e.target.value
        });
    }

	handlePassChange(e) {
        this.setState({
            pass: e.target.value
        });
    }
}

