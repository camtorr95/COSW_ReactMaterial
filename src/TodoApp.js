import React, {Component} from 'react';
import axios from 'axios'
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {TodoList} from "./TodoList";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Auth = {
	signOut() {
		localStorage.setItem('isLoggedIn', false);
		localStorage.setItem('accessToken', '');
	}
};

const AxiosInstance = axios.create({
            baseURL: 'http://localhost:8080/api',
            timeout: 1000,
            headers: {'Authorization': 'Bearer '+ localStorage.getItem('accessToken')}
        });

class TodoApp extends Component {
	
	constructor(props) {
		super(props);
		this.state = {items: [], text: '', priority: 0, dueDate: null};
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
	
	render () {
		return (
			<div>
				<form onSubmit={this.handleSubmit} className="todo-form">
					<div>
						<h3>New TODO</h3>
						<button onClick={this.handleSignOut}>Signout</button>
					</div>
					<br/>
                    <label htmlFor="text" className="right-margin">
                        Text:
                    </label>

                    <input
                        id="text"
                        onChange={this.handleTextChange}
                        value={this.state.text}>
                    </input>

                    <br/>
                    <br/>
                    <label htmlFor="priority" className="right-margin">
                        Priority:
                    </label>

                    <input
                        id="priority"
                        type="number"
                        onChange={this.handlePriorityChange}
                        value={this.state.priority}>
                    </input>
                    <br/>
                    <br/>

                    <DatePicker
                        id="due-date"
                        selected={this.state.dueDate}
                        placeholderText="Due date"
                        onChange={this.handleDateChange}>
                    </DatePicker>
                    <br/>
                    <button>
                        Add #{this.state.items.length + 1}
                    </button>
                </form>
                <br/>
                <br/>
                <TodoList todoList={this.state.items}/>
			</div>
		);
	}

	handleTextChange = e => {
        this.setState({
            text: e.target.value
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

	getTodoList = () => {
		var self = this;
		AxiosInstance.get('/').then(function(response) {
			self.setState({items: response.data});
		})
	}
	
	postTodo = (todo) => {
		let self = this;
		AxiosInstance.post('/', todo).then(function(response){
			self.setState(prevState => ({
				items: [...prevState.items, response.data],
				text: '',
				priority: '',
				dueDate: ''
			}));
		});
	}
	
    handleSubmit = e => {

        e.preventDefault();

        if (!this.state.text.length || !this.state.priority.length || !this.state.dueDate)
            return;

        const newItem = {
            text: this.state.text,
            priority: this.state.priority,
            dueDate: this.state.dueDate,
        };
		
		console.log(newItem);
		this.postTodo(newItem);
    }
}

export default withRouter(TodoApp)
