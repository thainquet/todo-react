import React, { Component } from 'react';
import axios from 'axios';


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

    async componentWillMount() {
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
    }

    async onDeleteTodo() {
        await axios.delete('https://tripi-todo-react-server.herokuapp.com/delete/'+this.props.match.params.id)
        await this.props.history.push('/');
    }
    render() {
        return (
            <div>
                <div align="center">
                
                    <ul style={{listStyleType: 'none'}}>
                    <li>
                    <h3>Thông tin</h3></li>
                    <br/>
                        <li>Mô tả: {this.state.todo_description}</li>
                        <br/>
                        <li>Người thực hiện: {this.state.todo_responsible}</li>
                        <br/>
                        <li>Độ ưu tiên: {this.state.todo_priority}</li>
                        <br/>
                        <br/>
                        <br/>
                        <li><input type="button" align="center" onClick={this.onDeleteTodo} value="Delete Todo" className="btn btn-danger" /></li>
                    </ul> 
                </div>
                
            </div>
        )
    }
}