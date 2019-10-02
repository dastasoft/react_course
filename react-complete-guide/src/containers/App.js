import React, { Component } from 'react';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import classes from './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    characters: [
      { id: 'asdad1', name: 'Squall', job: 'Gunblade' },
      { id: 'qweqwe2', name: 'Rinoa', job: 'Ranger' },
      { id: 'trytr3', name: 'Zell', job: 'Monk' }
    ],
    showPersons: true
  };

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  /*componentWillMount() {
    console.log('[App.js] componentWillMount');
  }*/

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

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
    this.setState({ showPersons: !this.state.showPersons });
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.characters; --> With this way you're creating a pointer to the same array and mutating after, this is not a good practice
    const persons = [...this.state.characters];
    persons.splice(personIndex, 1);
    this.setState({ characters: persons });
  }

  render() {
    console.log('[App.js] render');
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
        persons={this.state.characters}
        click={this.deletePersonHandler}
        change={this.inputJobHandler}
      />;
    }

    return (
      <div className={classes.App}>
        <Cockpit
          title={this.props.appTitle}
          charactersLength={this.state.characters.length}
          showPersons={this.state.showPersons}
          switchJobHandler={this.switchJobHandler}
          changeNamesHandler={this.changeNamesHandler}
          togglePersonsHandler={this.togglePersonsHandler}
        />
        {persons}
      </div>
    );
  }
}

export default App;
