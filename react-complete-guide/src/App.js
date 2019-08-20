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

  render() {
    return (
      <div className="App">
        <h1>Hi, I'm a React App.</h1>
        <p>This is really working!</p>
        <button onClick={this.switchJobHandler}>Switch Jobs</button>
        <Person name={this.state.characters[0].name} job={this.state.characters[0].job} >Skills: Summumm</Person>
        <Person name={this.state.characters[1].name} job={this.state.characters[1].job} />
        <Person name={this.state.characters[2].name} job={this.state.characters[2].job} />
      </div>
    );

    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App.'));
  }
}

export default App;
