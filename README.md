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
