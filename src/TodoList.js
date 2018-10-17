import React from 'react';
import {Todo} from './Todo'

export class TodoList extends React.Component {

    render() {
        const todoList = this.props.todoList.map((todo, i) => {
            return (
                <Todo key={i} description={todo.description} priority={todo.priority} dueDate={todo.dueDate} responsible={todo.responsible} status={todo.status} fileUrl={todo.fileUrl}/>
            );
        });

        return (
            <table>
                <thead>
                <tr>
                    <th>Task</th>
                    <th>Priority</th>
                    <th>Due Date</th>
					<th>Responsible</th>
					<th>Status</th>
					<th>File</th>
                </tr>
                </thead>
                <tbody>
                {todoList}
                </tbody>
            </table>
        );


    }

}