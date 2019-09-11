import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    characters: [
      { id: 'asdad1', name: 'Squall', job: 'Gunblade' },
      { id: 'qweqwe2', name: 'Rinoa', job: 'Ranger' },
      { id: 'trytr3', name: 'Zell', job: 'Monk' }
    ],
    showPersons: true
  };

  switchJobHandler = () => {
    this.setState({
      characters: [
        { id: this.state.characters[0].id, name: this.state.characters[0].name, job: 'Samurai' },
        { id: this.state.characters[1].id, name: this.state.characters[1].name, job: 'Witch' },
        { id: this.state.characters[2].id, name: this.state.characters[2].name, job: 'Duelist' }
      ]
    });
  };

  inputJobHandler = (event, id) => {
    const personIndex = this.state.characters.findIndex(p => {
      return p.id === id;
    });

    let persons = [...this.state.characters];
    persons[personIndex].job = event.target.value;

    this.setState({
      characters: persons
    });
  }

  changeNamesHandler = (...newNames) => {
    this.setState({
      characters: [
        { id: this.state.characters[0].id, name: newNames[0], job: this.state.characters[0].job },
        { id: this.state.characters[1].id, name: newNames[1], job: this.state.characters[1].job },
        { id: this.state.characters[2].id, name: newNames[2], job: this.state.characters[2].job }
      ]
    });
  }

  togglePersonsHandler = () => {
    this.setState({showPersons: !this.state.showPersons});
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.characters; --> With this way you're creating a pointer to the same array and mutating after, this is not a good practice
    const persons = [...this.state.characters];
    persons.splice(personIndex, 1);
    this.setState({characters: persons});
  }

  render() {
    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.characters.map((person, index) => {
            return <Person 
                      click={() => this.deletePersonHandler(index)}
                      change={event => this.inputJobHandler(event, person.id)}
                      name={person.name} 
                      job={person.job} 
                      key={person.id} />
          })}
        </div>
      );
    } else {
      btnClass = classes.Green;
    }

    const classesApplied = [];
    if (this.state.characters.length <= 2) {
      classesApplied.push(classes.red);

      if (this.state.characters.length <= 1) {
        classesApplied.push(classes.bold);
      }
    }

    return (
        <div className={classes.App}>
          <h1>Hi, I'm a React App.</h1>
          <p className={classesApplied.join(' ')}>This is really working!</p>
          <div className={classes.buttons}>
            <button
              className={btnClass}
              onClick={this.switchJobHandler}>Switch Jobs</button>
            <button
              className={btnClass}
              onClick={this.changeNamesHandler.bind(this, 'Leon', 'Ultimecia', 'Chicken Wuss')}>Change Names</button>
            <button
              className={btnClass}
              onClick={this.togglePersonsHandler}>Toggle Characters</button>
          </div>
          {persons}
        </div>
    );
  }
}

export default App;
