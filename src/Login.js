import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import App from './App'
import './Login.css'


export class Login extends React.Component{

	constructor(props){
		super(props);
		this.state = {email: '', pass: ''};
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePassChange = this.handlePassChange.bind(this);
	}

    render(){
        return (
            <React.Fragment>
                <CssBaseline />
                <main className="layout">
                    <Paper className="paper">
                        <Avatar className="avatar">
                            <LockIcon />
                        </Avatar>
                        <Typography variant="headline">Sign in</Typography>
                        <form onSubmit={App.handleLoginSubmit} className="form">
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input 
									id="email" 
									name="email" 
									autoComplete="email" 
									autoFocus 
									onChange={this.handleEmailChange}
			                    />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
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
    }

	handleEmailChange(e) {
        this.setState({
            email: e.target.value
        });
		localStorage.setItem('email', e.target.value);
    }

	handlePassChange(e) {
        this.setState({
            pass: e.target.value
        });
		localStorage.setItem('pass', e.target.value);
    }
}

