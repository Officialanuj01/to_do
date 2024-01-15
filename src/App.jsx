import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      toDo: [],
      task: '',
      editingIndex: -1,
    };
  }

  changeState = () => {
    const whiteSpace = this.state.task.trim();
    if (whiteSpace !== '') {
      this.setState({
        toDo: [...this.state.toDo, this.state.task],
        task: '',
        editingIndex: -1,
      });
    }
  };

  takeInput = (e) => {
    this.setState({ task: e.target.value });
  };

  startEditing = (index) => {
    this.setState({ editingIndex: index, task: this.state.toDo[index] });
  };

  finishEditing = () => {
    const { toDo, task, editingIndex } = this.state;
    const updatedToDo = [...toDo];
    updatedToDo[editingIndex] = task;
    this.setState({ toDo: updatedToDo, task: '', editingIndex: -1 });
  };

  delete = (index) => {
    const updatedToDo = [...this.state.toDo];
    updatedToDo.splice(index, 1);
    this.setState({ toDo: updatedToDo, editingIndex: -1 });
  };

  render() {
    return (
      <div className="main">
        <div className="mainpart">
          <input
            type="text"
            placeholder="enter a task"
            onChange={this.takeInput}
            value={this.state.task}
          />
          <button onClick={this.changeState}>Add Task</button>
        </div>
        <div>
          <ul>
            {this.state.toDo.map((task, index) => {
              return (
                <div key={index}>
                  <div>
                    {this.state.editingIndex === index ? (
                      <input
                        onChange={this.takeInput}
                        onBlur={this.finishEditing}
                        value={this.state.task}
                        autoFocus
                      />
                    ) : (
                      <span onClick={() => this.startEditing(index)}>
                        {task}
                      </span>
                    )}
                    <button onClick={() => this.delete(index)}>Delete</button>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;

