import React, {Component} from 'react';
import axios from 'axios'
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {TodoList} from "./TodoList";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const Auth = {
	signOut() {
		localStorage.setItem('isLoggedIn', false);
		localStorage.setItem('accessToken', '');
	}
};

const AxiosInstance = axios.create({
			baseURL: 'http://localhost:8080/api/',
            timeout: 7000,
            headers: {"Access-Control-Allow-Origin": "*"}
        });

class TodoApp extends Component {
	
	constructor(props) {
		super(props);
		this.state = {items: [], description: '', priority: 0, dueDate: null, responsible: '', status: 'pending', file: null};
		this.getTodoList();
	}

	static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	}
	
	handleSignOut = async e => {
		await Auth.signOut();
		this.props.history.push("/login");
	}
	
	handleInputChange = async e => {
		this.setState({
			file: e.target.files[0]
		});
	}
	
	render () {
		return (
			<div>
            <React.Fragment>
                <CssBaseline />
                <main className="layout">
                    <Paper className="paper">
                        <Typography variant="headline">Add TODO</Typography>					
                        <form onSubmit={this.handleSubmit} className="form">
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="description">Description</InputLabel>
                                <Input 
									id="description" 
									name="description" 
									autoComplete="description" 
									autoFocus 
									onChange={this.handleDescriptionChange}
									value={this.state.description}
			                    />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="priority">Priority</InputLabel>
                                <Input
                                    name="priority"
                                    type="number"
                                    id="priority"
                                    autoComplete="priority"
									onChange={this.handlePriorityChange}
			                        value={this.state.priority}
                                />
                            </FormControl>
							<FormControl margin="normal" required fullWidth>
                                <DatePicker
									id="due-date"
									selected={this.state.dueDate}
									placeholderText="Due date"
									onChange={this.handleDateChange}>
								</DatePicker>
                            </FormControl>
							<FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="responsible">Responsible</InputLabel>
                                <Input
                                    name="responsible"
                                    id="responsible"
                                    autoComplete="responsible"
									onChange={this.handleResponsibleChange}
			                        value={this.state.responsible}
                                />
                            </FormControl>
							<FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="status">Status</InputLabel>
                                <Input
                                    name="status"
                                    id="status"
                                    autoComplete="status"
									onChange={this.handleStatusChange}
			                        value={this.state.status}
                                />
                            </FormControl>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="file_in">File (1 mb limit)</InputLabel>
                                <input type="file" id="file_in" name="file_in" onChange={this.handleInputChange}/>
                            </FormControl>
							<FormControl margin="normal">
								<Button
									type="submit"
									fullWidth
									variant="raised"
									color="primary"
									className="submit"
								>
									Add #{this.state.items.length + 1}
								</Button>
							</FormControl>
                        </form>
						<br/>
                    </Paper>
                </main>
			</React.Fragment>
			<br/>
			<TodoList todoList={this.state.items}/>
			</div>
        );
	}

	handleDescriptionChange = e => {
        this.setState({
            description: e.target.value
        });
    }

    handlePriorityChange = e => {
        this.setState({
            priority: e.target.value
        });
    }

    handleDateChange = date => {
        this.setState({
            dueDate: date
        });
    }
	
	handleResponsibleChange =  async e => {
		this.setState({
			responsible: e.target.value
		});
	}
	
	handleStatusChange = async e => {
		this.setState({
			status: e.target.value
		});
	}

	getTodoList = () => {
		var self = this;
		AxiosInstance.get('todo').then(function(response) {
			self.setState({items: response.data});
		})
	}
	
	postTodo = (todo) => {
		let self = this;
		AxiosInstance.post('todo', todo).then(function(response){
			self.setState(prevState => ({
				items: [...prevState.items, response.data],
				description: '',
				priority: '',
				dueDate: null,
				responsible: '',
				status: 'pending',
				file: null
			}));
		});
	}
	
    handleSubmit = e => {

        e.preventDefault();

		let data = new FormData();
        data.append('file', this.state.file);
		let self = this;
        AxiosInstance.post('files', data)
            .then(function (response) {
                console.log("file uploaded!", data);
				if (!self.state.description.length || !self.state.priority.length || !self.state.dueDate || !self.state.responsible || !self.state.status)
					return;

				const newItem = {
					description: self.state.description,
					priority: self.state.priority,
					dueDate: self.state.dueDate,
					responsible: self.state.responsible,
					status: self.state.status,
					fileUrl: self.state.file.name
				};
		
				console.log(newItem);
				self.postTodo(newItem);
        })
        .catch(function (error) {
            console.log("failed file upload", error);
        })
    }
}

export default withRouter(TodoApp)
