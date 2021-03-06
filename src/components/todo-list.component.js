import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
        <td>
            {props.todo.todo_completed ? 
            <Link to={"/delete/"+props.todo._id}>Xóa</Link> : 
            <Link to={"/edit/"+props.todo._id}>Sửa</Link>
            }
            
        </td>
    </tr>
)

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {todos: []};
    }

    isRemove() {
        return <Link to={"/edit/"+this.props.todo._id}>Xóa</Link>
    }

    componentWillMount() {
        axios.get('https://tripi-todo-react-server.herokuapp.com/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    todoList() {
        return this.state.todos.map(function(currentTodo, i){
            return <Todo todo={currentTodo} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped centered" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Mô tả</th>
                            <th>Người thực hiện</th>
                            <th>Độ ưu tiên</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
                <Link to="/create" className="nav-link" style={{textAlign: "center"}}><input type="button" value="Create New Todo" className="btn btn-primary" /></Link>
            </div>
        )
    }
}