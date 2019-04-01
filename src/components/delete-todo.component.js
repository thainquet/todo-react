import React, { Component } from 'react';
import axios from 'axios';

const Todo = props => (
    <ul>
        <li>{props.todo.todo_description}</li>
        <li>{props.todo.todo_responsible}</li>
        <li>{props.todo.todo_priority}</li>
    </ul>
)

export default class EditTodo extends Component {

    constructor(props) {
        super(props);
        this.onDeleteTodo = this.onDeleteTodo.bind(this)

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        }
    }

    componentWillMount() {
        axios.get('https://tripi-todo-react-server.herokuapp.com/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo_description: response.data.todo_description,
                    todo_responsible: response.data.todo_responsible,
                    todo_priority: response.data.todo_priority,
                    todo_completed: response.data.todo_completed
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
        console.log(this.props)
    }

    async onDeleteTodo() {
        await axios.delete('https://tripi-todo-react-server.herokuapp.com/delete/'+this.props.match.params.id)
        await axios.get('https://tripi-todo-react-server.herokuapp.com/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo_description: response.data.todo_description,
                    todo_responsible: response.data.todo_responsible,
                    todo_priority: response.data.todo_priority,
                    todo_completed: response.data.todo_completed
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
        await this.props.history.push('/');
    }
    todoList() {
        console.log("state",this.state);
        return this.state.todos.map(function(currentTodo, i){
            return <Todo todo={currentTodo} key={i} />;
        })
    }
    render() {
        return (
            <div>
                <h3 align="center">Thng tin</h3>
                <div>{this.todoList}</div>
                <div align="center"><input type="button" align="center" onClick={this.onDeleteTodo} value="Delete Todo" className="btn btn-danger" /></div>
            </div>
        )
    }
}