import React, { Component } from 'react';
import axios from 'axios';



export default class CreateTodo extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        }

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }

    onChangeTodoResponsible(e) {
        this.setState({
            todo_responsible: e.target.value
        });
    }

    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }

    async onSubmit(e) {
        await e.preventDefault();
        
        const newTodo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        }

        await axios.post('https://tripi-todo-react-server.herokuapp.com/add', newTodo)
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

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Tạo mới công việc</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Mô tả: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_description || ''}
                                onChange={this.onChangeTodoDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Người thực hiện: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.todo_responsible || ''}
                                onChange={this.onChangeTodoResponsible}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value="Thấp"
                                    checked={this.state.todo_priority==='Thấp'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Thấp</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityMedium" 
                                    value="Trung Bình" 
                                    checked={this.state.todo_priority==='Trung Bình'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Trung Bình</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityHigh" 
                                    value="Cao" 
                                    checked={this.state.todo_priority==='Cao'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Cao</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}