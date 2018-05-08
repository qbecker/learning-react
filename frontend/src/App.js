import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//my imports
import TaskList from "./TaskList";

class App extends Component {
  state = {
    tasks: []
  };
  
  async componentDidMount() {
    try {
      const res = await fetch('https://django-react-work-management-qbecker.c9users.io:8080/taskkeeper/');
      const tasks = await res.json();
      this.setState({
        tasks
      });
    } catch (e) {
      console.log(e);
    }
  }

  
  render() {
    return (
      <div>
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="TaskMaster">Welcome my dudes</h1>
      </header>
      <div>
        <TaskList data={this.state.tasks}/>
      </div>
      </div>
    );
  }
}

export default App;
