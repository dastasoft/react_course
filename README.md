# React Course
My progress on Udemy's React course from Maximilian Schwarzmüller

## [Create React App](https://github.com/facebook/create-react-app)

Instead of build a new project from scratch and configure everything, we will use Create React App which comes with all ready to go.

```sh
npm install create-react-app -g
```

_(-g for globally instalation)_

In order to create a new react project:

```sh
create-react-app react-complete-guide
```

_This will create a new react app inside of the react-complete-guide folder_

### Starting the app

```sh
npm start
```

With the command display above the default browser is opened, if you want to specify which browser you can add the ```BROWSER``` variable:

```sh
BROWSER=firefox npm start
```

The start command will raise a local server at ```localhost:3000``` by default. 

The local server have hot reaload enable, when you edit something it will change right at the moment.

### Project directory structure

In the ```public``` folder we can find the ```index.html``` which is sent to browser for the SPA. 

```html
<div id="root"></div>
```

_Remember that the div with the root id is where all the components are rendered._

In the ```src``` folder goes the logic and style of the app. Inside of ```index.js``` you can find the _magic_ which links the root id division with the components:

```javascript
ReactDOM.render(<App />, document.getElementById('root'));
```

_The usually workflow is only the main App goes to root and inside of that main App we will nest the other components which can have other component nested too._

**_The ```test.js``` will get covered later on this document_**

## [JSX](https://reactjs.org/docs/introducing-jsx.html)

JSX stands for JavaScript XML and allow us to write "HTML" in React. The use of JSX is not mandatory but is the standard nowadays for React usage.

For example:

```jsx
<div className="App">
    <h1>Hi, I'm a React App.</h1>
</div>
```

The above JSX is converted behind the scenes into this JS:

```javascript
React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App.'));
```

**It is a good practice to wrap all elements of the JSX in one root element, the div in this case.**

_Since JSX is closer to JavaScript than to HTML, React DOM uses ```camelCase``` property naming convention instead of HTML attribute names. For ```class``` it becomes ```className``` because class is a keyword of the JavaScript language_

### Dynamic Content

In JSX we can put dynamic content inside the curly braces, **you can put any valid JavaScrip expression**, one line expressions like simple calculations, function calls, etc.

```jsx
return (
    <p>I'm a person and I have {Math.floor(Math.random() * 100)} years old!</p>
);
```

## Components

There are two types of components:

### Functional Components

If your component doesn't do much more than take in some props and render. You can think of these as pure functions because they will always render and behave the same, given the same props. Also, they don't care about lifecycle methods or have their own internal state.

Because they're lightweight, writing these simple components as functional components is pretty standard.

An example of functional component, inside of our ```src``` folder we create a ```Person``` folder which contains a ```Person.js``` file.

```javascript
import React from 'react';

const person = () => {
    return (
        <p>I'm a person!</p>
    );
}

export default person;
```

_Remember we import React because we are using JSX and this behind the scenes is translate with ```React.createlement```_

### Class-base Components

If your components need more functionality, like keeping state, use class-base components instead.

One good example is the ```App.js``` already created

```javascript
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hi, I'm a React App.</h1>
      </div>
    );
  }
}

export default App;
```

### Import Component

If we want to use the ```Person``` component into the ```App``` component we need to import the component and use it as a HTML tag

```javascript
import Person from './Person/Person';

<Person />
```

- Is not necessary to define the extension .js this will be added automatically in build time for js files.
- Use the first letter as a capital letter in order to indicate this is a custom tag.
- In this example ```Person``` component does not have any nested components we can self close the tag.


### Passing Properties

The great thing about components it's they are reusable, and for being really reusable we want to pass data for the different instances of our components.

If we check the "HTML" of the component:

```javascript
<Person name="Squall" job="Gunblade" />
```

In the component itself we can recieve the arguments with:

```javascript
const person = (props) => {
    return (
        <p>I'm {props.name} and my job is {props.job}.</p>
    );
};
```

_If we are using a class-base component it will be ```this.props```_

There's also another way of passing data from the "HTML" to the component logic and it's using a content in between of the component tag.

```javascript
<Person name="Squall" job="Gunblade" >Skills: Summumm</Person>
```

In order to retrieve the content we can use the ```children``` property:

```javascript
const person = (props) => {
    return (
        <div>
            <p>I'm {props.name} and my job is {props.job}.</p>
            <p>{props.children}</p>
        </div>
    );
};
```

Take care if you define an attribute named ```children``` on the tag:

```javascript
<Person name="Squall" job="Gunblade" children="This will not be rendered because I already have children elements" >Skills: Summumm</Person>

<Person name="Squall" job="Gunblade" children="This will not be rendered because I do not have children elements" />
```

In the first example, the content under children attribute will not be accesible with ```props.children```.

### Passing functions as properties

The ```props``` can contain function also no only properties

```javascript
<p onClick={props.click}>
// ...
</p>

<Person 
    name={this.state.characters[0].name} 
    job={this.state.characters[0].job} 
    click={this.switchJobHandler} 
/>
```

If you need to pass arguments in the functions can be done in two different ways

Imagine the next function:

```javascript
switchNameHandler = (newName) => {
    this.setState({
        characters: [
            { name: newName, job: 'Samurai' },
      ]
    });
}
```

In order to pass ```newName``` to the ```swiitchNameHandler``` we must bind it

```javascript
<button onClick={this.switchNameHandler.bind(this, 'Leon')}>Switch Name</button>
```

Or use an arrow function

```javascript
<button onClick={() => this.switchNameHandler('Leon')}>Switch Name</button>
```

_With the arrow function the ```switchNameHandler``` does not execute inmediatly instead, returns the execution when is call the onclick, **this way is more ineficient than bind option**._

### State propertie

Class-base component has an special keyword for manage internal data, the ```state```. In order to declare and use it your class-base component must extends from Component. **Check ```Hooks``` section in order to get updated about this information.**

```javascript
state = {
    characters: [
      { name: 'Squall', job: 'Gunblade' },
      { name: 'Rinoa', job: 'Ranger' },
      { name: 'Zell', job: 'Monk' }
    ],
    otherProp = 'other propertie'
};

<Person name={this.state.characters[1].name} job={this.state.characters[1].job} />
```

For update the state, we must pass the entire object of the property we want to update.

```javascript
this.setState({
    characters: [
    { name: 'Squall', job: 'Samurai' },
    { name: 'Rinoa', job: 'Witch' },
    { name: 'Zell', job: 'Duelist' }
    ]
});
```

**Do NOT mutate the state directly, React will ignore the changes. Instead use ```this.setState()```**

_Keep in mind any changes to props and/or state trigger React to re-render your components an ppotentially update the DOPM in the browser._


### Event Listeners

Let's put an example with the ```onclick``` event.

On our class-base component we create:

```jsx
switchJobHandler = () => {
    console.log('Was clicked!');
};

<button onClick={this.switchJobHandler}>Switch Jobs</button>
```

Here are three important things:
- The function is declarated with ES6 syntax because it's inside of a class and if you do a normal function declaration, later on you will face problems with ```this``` keyword. (Normal functions create a new this scope for themselves, arrow functions instead shares the scope of this with the parent.).
- The onclick event in JSX is ```camelCase```. Remember **this is not HTML**.
- The function is written without () because we don't want to call it when the UI is rendered, for that we only pass the function and when onclick is triggered the call is done.

You can see a complete list of Reac supported events [here](https://reactjs.org/docs/events.html#supported-events).

## Render conditional content

If you want render content in some scenarios you can wrap the code in JSX with {} and add a simple statement _If/else blocks does not work here_

```jsx
{
    this.state.showPersons ? 
        <div>
            <Person />
            <Person />
        </div> : null
}
```

With the code above you use the ternary operator to check if certain value is true or not, and if is true render a Person component.

Another way of doing this (and more efficient) is doing the check inside the render function instead of on the return JSX.

```javascript
render () {
    let persons = null;

    if (this.state.showPersons) {
        persons = (
            <div>
                <Person />
                <Person />
            </div>
        );
    }

    return (
        {persons}
    );
}
```

In this example the code is small and it's no difference which way you choose, but when you have more conditionals and nested conditionals this is the best way to do it.

## Render List

For render lists on React we will use the provided methods in JavaScript

```javascript
return (
    <div>
      {this.state.characters.map(person => {
        return <Person
                  name={person.name} 
                  job={person.job} />
      })}
    </div>
);
```

React will try to print any array that it's returned and contain a object model that React understand, in the example above we "translate" our characters array stored in the state into a Person component which React knows how to render.

### Key property

When work with list you need to specify a key in order to inform React changes or which components are present on the screen. The ```key``` property has not be specified into the component because React always expects it but you must pass as an attribute. _Remember that the key must be an unique identifier._

```javascript
return (
    <div>
      {this.state.characters.map(person => {
        return <Person
                  name={person.name} 
                  job={person.job} 
                  key={person.id}/>
      })}
    </div>
);
```

## Styling

For apply style to our components the common pattern is create a separate ```.css``` file in the same folder of the component with the same name.

Inside of our ```Person.css``` we will wrap everything with the component's name in order to prevent errors _Even if the css file is in the component's folder webpack adds the style in the ```index.html``` head, so **it has global access.**_

```css
.Person {
    width: 60%;
    margin: 16px auto;
    border: 1px solid #eee;
    border-radius: 2%;
    box-shadow: 0 2px 3px #ccc;
    padding: 16px;
    text-align: center;
}
```

On the ```.js``` file of the component we must import it and set the class

```javascript
import './Person.css';

<div className="Person">
<!-- ... --->
</div>
```

_When Webpack add your css into the header of main HTML will be prefixing the css in order to work in all browsers._

There's also inline style. 

```javascript
const style = {
    backgroundColor: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer'
};
```

_Remember is a JavaScript object not a CSS, for that reason ```camelCase``` instead of dashes._

The benefit of inline style it is not have css globally (like the example above) and scoped/limited to the current component or event object. 

A major downside of inline styles is some powerfull tools present in CSS, like pseudo selectors, you can't use it in this way.

### Fixing in line style

As I say before does not support some features like pseudo selectors, for example ```hover```

The real problem is, if you in the CSS of you component defines:

```css
button:hover {
    color: black
}
```

This will affect every button on your app because remember, it's scope globally.

In order to use pseudo selector and other features in in line style, which is scoped only to the element who uses it, you must install a third party package:

```sh
npm install --save radium
```

For use ```Radium``` in your component besides of importing it, you must wrap your export:

```javascript
import Radium from 'radium'

export default Radium(App);
```

With that now we can use Radium features like the pseudo selectors in inline style, for example, the hover:

```javascript
const style = {
  backgroundColor: 'red',
  color: 'white',
  font: 'inherit',
  border: '1px solid blue',
  padding: '8px',
  cursor: 'pointer',
  margin: '0 5px auto',
  ':hover': {
    backgroundColor: 'salmon',
    color: 'black'
  }
};

style.backgroundColor = 'green';
style[':hover'] = {
  backgroundColor: 'lightgreen',
  color: 'black'
}
```

Remember the properties of a JavaScript object can be defined with strings too, normally used this way if contain invalid caracters (like de ```:```). Later on, when you want to manage that property, must be used with ```[]```.

### Dynamically assign classes

The ```className``` attribute search for a string of one or more classes to apply, for that one way to do it is:

```javascript
const classes = ['red', 'bold'].join(' '); // 'red bold' Valid CSS

<p className={classes}>Test</p>
```

Fill the array in the statements you want, but in the end you must have a valid css.

If you use in line style, it's a JavaScript object.

```javascript
const style = {
  backgroundColor: 'red',
  color: 'white',
  font: 'inherit',
  border: '1px solid blue',
  padding: '8px',
  cursor: 'pointer',
  margin: '0 5px auto'
};

style.backgroundColor = 'green';

<p style={style}>Test</p>
```
