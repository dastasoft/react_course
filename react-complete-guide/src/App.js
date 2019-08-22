import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    characters: [
      { name: 'Squall', job: 'Gunblade' },
      { name: 'Rinoa', job: 'Ranger' },
      { name: 'Zell', job: 'Monk' }
    ]
  };

  switchJobHandler = () => {
    this.setState({
      characters: [
        { name: 'Squall', job: 'Samurai' },
        { name: 'Rinoa', job: 'Witch' },
        { name: 'Zell', job: 'Duelist' }
      ]
    });
  };

  inputJobHandler = (event) => {
    this.setState({
      characters: [
        this.state.characters[0],
        { name: this.state.characters[1].name, job: event.target.value },
        this.state.characters[2]
      ]
    });
  }

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    return (
      <div className="App">
        <h1>Hi, I'm a React App.</h1>
        <p>This is really working!</p>
        <button
          style={style} 
          onClick={this.switchJobHandler}>Switch Jobs</button>
        <Person 
          name={this.state.characters[0].name} 
          job={this.state.characters[0].job} 
          click={this.switchJobHandler} >Skills: Summumm</Person>
        <Person 
          name={this.state.characters[1].name} 
          job={this.state.characters[1].job} 
          inputJob={this.inputJobHandler} />
        <Person 
          name={this.state.characters[2].name} 
          job={this.state.characters[2].job} />
      </div>
    );

    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App.'));
  }
}

export default App;
