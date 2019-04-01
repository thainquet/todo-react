import React, { Component } from 'react';

//import css custom
import './App.css';

//import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

// define react router
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import CreateTodo from './components/create-todo.component'
import EditTodo from './components/edit-todo.component'
import TodoList from './components/todo-list.component'
import DeleteTodo from './components/delete-todo.component'


import Logo from './logo-tripi-64x30.png'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">
              <img src={Logo} width="64" height="30" alt="Tripi" />
            </a>
            <Link to="/" className="navbar-brand">Todo App</Link>
          </nav>
          <br/>
          <Route path="/" exact component={TodoList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
          <Route path="/delete/:id" component={DeleteTodo} />
        </div>
      </Router>
    );
  }
}

export default App;
