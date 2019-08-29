import React, { Component } from 'react';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {
  state = {
    inputText: '',
    textLength: 0
  }

  displayTextLengthHandler = (event) => {
    const textLength = event.target.value.length;
    this.setState({
      inputText: event.target.value,
      textLength: textLength
    });
  };

  deleteLetterHandler = id => {
    const text = this.state.inputText.split('');
    text.splice(id, 1);

    this.setState({
      inputText: text.join('')
    });
  };

  renderCharComponentList = () => {
    return this.state.inputText.split('').map((letter, index) => {
      return <CharComponent
                key={index}
                click={() => this.deleteLetterHandler(index)}
                letter={letter} /> 
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Task 2 - List & Conditionals</h1>
        <input type="text" onChange={this.displayTextLengthHandler} value={this.state.inputText}/>
        <ValidationComponent textLength={this.state.textLength}/>
        {this.renderCharComponentList()}
      </div>
    );
  }
}

export default App;
