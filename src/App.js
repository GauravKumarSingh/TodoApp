import React from "react";
import "./styles.css";
//1:08
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inpVal: "",
      tasks: [],
      taskleft: 0
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleNewTask = this.handleNewTask.bind(this);
    this.handleTaskCompletion = this.handleTaskCompletion.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(name) {
    console.log("name is ", name);
    let tasks = this.state.tasks;
    let updatedTask = [];
    for (let task of tasks) {
      if (task.name !== name) {
        updatedTask.push(task);
      }
    }
    this.setState({
      tasks: updatedTask
    });
  }

  handleClear() {
    let tasks = this.state.tasks;
    // let taskLeft = this.state.taskLeft;
    let updatedTask = [];
    for (let task of tasks) {
      if (!task.completed) {
        updatedTask.push(task);
      }
    }
    let taskLeft = updatedTask.length;
    this.setState({
      tasks: updatedTask,
      taskLeft: taskLeft
    });
  }
  handleInput(e) {
    let val = e.target.value;
    this.setState({
      inpVal: val
    });
  }

  handleNewTask(e) {
    if (e.keyCode == "13") {
      let name = e.target.value.split(" ").join("");
      let tasks = [
        ...this.state.tasks,
        { val: e.target.value, completed: false, name: name }
      ];
      let taskleft = this.state.taskleft + 1;
      this.setState({
        tasks: tasks,
        inpVal: "",
        taskleft: taskleft
      });
    }
  }

  handleTaskCompletion(name, e) {
    // console.log("inside handleTaskCompletion: ", e.target.checked);
    let tasks = [...this.state.tasks];
    let taskleft = tasks.length;
    for (let task of tasks) {
      if (task.name === name) {
        if (e.target.checked) {
          task.completed = true;
        } else {
          task.completed = false;
        }
      }

      if (task.completed) {
        taskleft--;
      }
    }
    this.setState({
      tasks: tasks,
      taskleft: taskleft
    });
  }

  render() {
    let remTasks = this.state.tasks.length - this.state.taskleft;
    return (
      <div className="container">
        <div className="input-msg">What do you want to do Today?</div>
        <div className="input-box">
          <input
            type="text"
            value={this.state.inpVal}
            onChange={this.handleInput}
            onKeyDown={this.handleNewTask}
            name="inp"
          />
        </div>
        <div className="task-list">
          {this.state.tasks.map((item) => {
            // console.log("item is ", item);
            return (
              <div className="item">
                <span>
                  <input
                    type="checkbox"
                    name={item.name}
                    checked={item.completed}
                    onChange={(e) => this.handleTaskCompletion(item.name, e)}
                  />
                </span>
                {item.completed ? (
                  <strike>
                    <span>{item.val}</span>
                  </strike>
                ) : (
                  <span>{item.val}</span>
                )}
                <div
                  className="del"
                  onClick={() => this.handleDelete(item.name)}
                >
                  X
                </div>
              </div>
            );
          })}
        </div>
        <div className="current-status">
          <div className="task-left">{this.state.taskleft} tasks Left</div>
          <div className="clear-all" onClick={this.handleClear}>
            Clear
          </div>
          <div className="task-completed">{remTasks} completed task</div>
        </div>
      </div>
    );
  }
}
