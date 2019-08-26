import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    characters: [
      { name: 'Squall', job: 'Gunblade' },
      { name: 'Rinoa', job: 'Ranger' },
      { name: 'Zell', job: 'Monk' }
    ],
    showPersons: true
  };

  switchJobHandler = () => {
    this.setState({
      characters: [
        { name: this.state.characters[0].name, job: 'Samurai' },
        { name: this.state.characters[1].name, job: 'Witch' },
        { name: this.state.characters[2].name, job: 'Duelist' }
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

  changeNamesHandler = (...newNames) => {
    this.setState({
      characters: [
        { name: newNames[0], job: this.state.characters[0].job },
        { name: newNames[1], job: this.state.characters[1].job },
        { name: newNames[2], job: this.state.characters[2].job }
      ]
    });
  }

  togglePersonsHandler = () => {
    this.setState({showPersons: !this.state.showPersons});
  }

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      margin: '0 5px auto'
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.characters.map(person => {
            return <Person name={person.name} job={person.job} />
          })}
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App.</h1>
        <p>This is really working!</p>
        <div>
          <button
            style={style} 
            onClick={this.switchJobHandler}>Switch Jobs</button>
          <button 
            style={style}
            onClick={this.changeNamesHandler.bind(this, 'Leon', 'Ultimecia', 'Chicken Wuss')}>Change Names</button>
          {/*<button 
            style={style}
          onClick={() => this.changeNamesHandler('Leon', 'Ultimecia', 'Chicken Wuss')}>Change Names</button>*/}
          <button
            style={style}
            onClick={this.togglePersonsHandler}>Toggle Characters</button>
        </div>

        {/*
          this.state.showPersons ?
            <div>
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
            </div> : null
        */}

        {persons}
      </div>
    );

    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App.'));
  }
}

export default App;
