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

This will create a new react app inside of the react-complete-guide folder.

### Starting the app

```sh
npm start
```

With the command display above the default browser is opened, if you want to specify which browser you can add the `BROWSER` variable:

```sh
BROWSER=firefox npm start
```

The start command will raise a local server at `localhost:3000` by default.

The local server have hot reaload enable, when you edit something it will change right at the moment.

### Project directory structure

In the `public` folder we can find the `index.html` which is sent to browser for the SPA.

```html
<div id="root"></div>
```

_Remember that the div with the root id is where all the components are rendered._

In the `src` folder goes the logic and style of the app. Inside of `index.js` you can find the _magic_ which links the root id division with the components:

```javascript
ReactDOM.render(<App />, document.getElementById("root"));
```

_The usually workflow is only the main App goes to root and inside of that main App we will nest the other components which can have other component nested too._

In order to structure components we should follow the next pattern

```sh
.
├── App.js
├── App.test.js
├── index.js
└── src
└── components
├── myComponent1
│├── myComponent1.js
│├── myComponent1.js
│├── myComponent1.test.js
│└── index.js
├── myComponent2
│├── myComponent2.js
│├── myComponent2.css
│├── myComponent2.test.js
│└── index.js
└── myComponent3
├── myComponent3.js
├── myComponent3.css
├── myComponent3.test.js
└── index.js
```

**_The `test.js` will get covered later on this document_**

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
React.createElement(
  "div",
  { className: "App" },
  React.createElement("h1", null, "Hi, I'm a React App.")
);
```

**It is a good practice to wrap all elements of the JSX in one root element, the div in this case.**

_Since JSX is closer to JavaScript than to HTML, React DOM uses `camelCase` property naming convention instead of HTML attribute names. For `class` it becomes `className` because class is a keyword of the JavaScript language_

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

An example of functional component, inside of our `src` folder we create a `Person` folder which contains a `Person.js` file.

```javascript
import React from "react";

const person = () => {
  return <p>I'm a person!</p>;
};

export default person;
```

_Remember we import React because we are using JSX and this behind the scenes is translate with `React.createlement`_

Functional components does not have access to `Lifecycle Hooks` and the access to the state is only from React v16.8+ with the inclusion of Hooks with `useState()`.

The access to the props is done by `props.someProperty`.

### Class-base Components

If your components need more functionality, like keeping state, use class-base components instead.

One good example is the `App.js` already created

```javascript
import React, { Component } from "react";
import "./App.css";

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

Class-vased components has access to the state and lifecycle hooks in any version of React.

The access to the state and props is done with `this` keyword:

```javascript
this.state.someValue;
this.props.someProperty;
```

### Import Component

If we want to use the `Person` component into the `App` component we need to import the component and use it as a HTML tag

```javascript
import Person from "./Person/Person";

<Person />;
```

- Is not necessary to define the extension .js this will be added automatically in build time for js files.
- Use the first letter as a capital letter in order to indicate this is a custom tag.
- In this example `Person` component does not have any nested components we can self close the tag.

### Passing Properties

The great thing about components it's they are reusable, and for being really reusable we want to pass data for the different instances of our components.

If we check the "HTML" of the component:

```javascript
<Person name="Squall" job="Gunblade" />
```

In the component itself we can recieve the arguments with:

```javascript
const person = props => {
  return (
    <p>
      I'm {props.name} and my job is {props.job}.
    </p>
  );
};
```

_If we are using a class-base component it will be `this.props`_

There's also another way of passing data from the "HTML" to the component logic and it's using a content in between of the component tag.

```javascript
<Person name="Squall" job="Gunblade">
  Skills: Summumm
</Person>
```

In order to retrieve the content we can use the `children` property:

```javascript
const person = props => {
  return (
    <div>
      <p>
        I'm {props.name} and my job is {props.job}.
      </p>
      <p>{props.children}</p>
    </div>
  );
};
```

Take care if you define an attribute named `children` on the tag:

```javascript
<Person name="Squall" job="Gunblade" children="This will not be rendered because I already have children elements" >Skills: Summumm</Person>

<Person name="Squall" job="Gunblade" children="This will not be rendered because I do not have children elements" />
```

In the first example, the content under children attribute will not be accesible with `props.children`.

### Passing functions as properties

The `props` can contain function also no only properties

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
switchNameHandler = newName => {
  this.setState({
    characters: [{ name: newName, job: "Samurai" }]
  });
};
```

In order to pass `newName` to the `swiitchNameHandler` we must bind it

```javascript
<button onClick={this.switchNameHandler.bind(this, "Leon")}>Switch Name</button>
```

Or use an arrow function

```javascript
<button onClick={() => this.switchNameHandler("Leon")}>Switch Name</button>
```

_With the arrow function the `switchNameHandler` does not execute inmediatly instead, returns the execution when is call the onclick, **this way is more ineficient than bind option**._

### State propertie

Class-base component has an special keyword for manage internal data, the `state`. In order to declare and use it your class-base component must extends from Component. **Check `Hooks` section in order to get updated about this information.**

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
    { name: "Squall", job: "Samurai" },
    { name: "Rinoa", job: "Witch" },
    { name: "Zell", job: "Duelist" }
  ]
});
```

**Do NOT mutate the state directly, React will ignore the changes. Instead use `this.setState()`**

_Keep in mind any changes to props and/or state trigger React to re-render your components an ppotentially update the DOPM in the browser._

### Event Listeners

Let's put an example with the `onclick` event.

On our class-base component we create:

```jsx
switchJobHandler = () => {
  console.log("Was clicked!");
};

<button onClick={this.switchJobHandler}>Switch Jobs</button>;
```

Here are three important things:

- The function is declarated with ES6 syntax because it's inside of a class and if you do a normal function declaration, later on you will face problems with `this` keyword. (Normal functions create a new this scope for themselves, arrow functions instead shares the scope of this with the parent.).
- The onclick event in JSX is `camelCase`. Remember **this is not HTML**.
- The function is written without () because we don't want to call it when the UI is rendered, for that we only pass the function and when onclick is triggered the call is done.

You can see a complete list of Reac supported events [here](https://reactjs.org/docs/events.html#supported-events).

## Render conditional content

If you want render content in some scenarios you can wrap the code in JSX with {} and add a simple statement _If/else blocks does not work here_

```jsx
{
  this.state.showPersons ? (
    <div>
      <Person />
      <Person />
    </div>
  ) : null;
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
      return <Person name={person.name} job={person.job} />;
    })}
  </div>
);
```

React will try to print any array that it's returned and contain a object model that React understand, in the example above we "translate" our characters array stored in the state into a Person component which React knows how to render.

### Key property

When work with list you need to specify a key in order to inform React changes or which components are present on the screen. The `key` property has not be specified into the component because React always expects it but you must pass as an attribute. _Remember that the key must be an unique identifier._

```javascript
return (
  <div>
    {this.state.characters.map(person => {
      return <Person name={person.name} job={person.job} key={person.id} />;
    })}
  </div>
);
```

## Styling

For apply style to our components the common pattern is create a separate `.css` file in the same folder of the component with the same name.

Inside of our `Person.css` we will wrap everything with the component's name in order to prevent errors _Even if the css file is in the component's folder webpack adds the style in the `index.html` head, so **it has global access.**_

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

On the `.js` file of the component we must import it and set the class

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
  backgroundColor: "white",
  font: "inherit",
  border: "1px solid blue",
  padding: "8px",
  cursor: "pointer"
};
```

_Remember is a JavaScript object not a CSS, for that reason `camelCase` instead of dashes._

The benefit of inline style it is not have css globally (like the example above) and scoped/limited to the current component or event object.

A major downside of inline styles is some powerfull tools present in CSS, like pseudo selectors, you can't use it in this way.

### Fixing in line style

As I say before does not support some features like pseudo selectors, for example `hover`

The real problem is, if you in the CSS of you component defines:

```css
button:hover {
  color: black;
}
```

This will affect every button on your app because remember, it's scope globally.

In order to use pseudo selector and other features in in line style, which is scoped only to the element who uses it, you must install a third party package:

```sh
npm install --save radium
```

For use `Radium` in your component besides of importing it, you must wrap your export:

```javascript
import Radium from "radium";

export default Radium(App);
```

With that now we can use Radium features like the pseudo selectors in inline style, for example, the hover:

```javascript
const style = {
  backgroundColor: "red",
  color: "white",
  font: "inherit",
  border: "1px solid blue",
  padding: "8px",
  cursor: "pointer",
  margin: "0 5px auto",
  ":hover": {
    backgroundColor: "salmon",
    color: "black"
  }
};

style.backgroundColor = "green";
style[":hover"] = {
  backgroundColor: "lightgreen",
  color: "black"
};
```

Remember the properties of a JavaScript object can be defined with strings too, normally used this way if contain invalid caracters (like de `:`). Later on, when you want to manage that property, must be used with `[]`.

#### Using media queries

Radium enables to use media queries in inline CSS but you need to wrap you application into a `StyleRoot`.

```javascript
import Radium, { StyleRoot } from 'radium';

return (
    const style = {
        '@media (min-width: 500px)': {
            width: '450px'
        }
    };

    <StyleRoot>
    ...
    </StyleRoot>
);
```

### Dynamically assign classes

The `className` attribute search for a string of one or more classes to apply, for that one way to do it is:

```javascript
const classes = ["red", "bold"].join(" "); // 'red bold' Valid CSS

<p className={classes}>Test</p>;
```

Fill the array in the statements you want, but in the end you must have a valid css.

If you use in line style, it's a JavaScript object.

```javascript
const style = {
  backgroundColor: "red",
  color: "white",
  font: "inherit",
  border: "1px solid blue",
  padding: "8px",
  cursor: "pointer",
  margin: "0 5px auto"
};

style.backgroundColor = "green";

<p style={style}>Test</p>;
```

## [CSS Modules](https://github.com/css-modules/css-modules)

With CSS modules, you can write normal CSS code and make sure, that it only applies to a given component.

In the newer versions of CRA (Create React App) CSS modules are already enabled, but in order to use it you must follow the naming convention `[name].module.css`.

Given the next css

```css
.App {
  text-align: center;
}
```

On your `App.js`

```javascript
import classes from './App.module.css';

<div className={classes.App}>
```

With this the class name will look like `App__App__c7e`, the class has a unique name attached to this component. If you want to work with global classes you only need to add `:global`

```css
:global .App {
  text-align: center;
}
```

```javascript
import classes from './App.module.css';

<div className="App">
```

## [Error Boundaries](https://reactjs.org/docs/error-boundaries.html)

When something went wrong you may want to display a custom HTML, for that you can wrap your code with a custom component which handles this. I'll call it `ErrorBoundary.js` but the name is up to you.

```javascript
import React, { Component } from "react";

class ErrorBoundary extends Component {
  state: {
    hasError: false,
    errorMessage: ""
  };

  componentDidCatch = (error, info) => {
    this.setState({ hasError: true, errorMessage: error });
  };

  render() {
    if (this.state.hasError) {
      return <h1>{this.state.errorMessage}</h1>;
    } else {
      return this.props.children;
    }
  }
}
```

ErrorBoundary has the `componentDidCatch` function which will update the state, this function is provided by React Component. For the render part, only if there are error will be displayed, otherwhise the component will be displayed.

On the component:

```javascript
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";

<ErrorBoundary key={person.id}>
  <Person
    click={() => this.deletePersonHandler(index)}
    change={event => this.inputJobHandler(event, person.id)}
    name={person.name}
    job={person.job}
  />
</ErrorBoundary>;
```

Note that the key now is on the ErrorBoundary component instead of the Person component, the wrapping component must have the key. ErrorBoundary here is what is called a high order component.

## Component Lifecycle

Class based component has access to the lifecycle methods.

### Creation

- `constructor(props)` Not really a React method because is a default ES6 class feature. Setups the state.
- `getDerivedStateFromProps(props, state)` Sync state.
- `render()` Prepare and structure your JSX code.
- Render child components. When all child components pass the lifecycle and render, the creation lifecycle is finished.
- `componentDidMount()` Cause side-effects.

### Update

- `getDerivedStateFromProps(props, state)` Sync state to props.
- `shouldComponentUpdate(nextProps, nextState)` Decide whether to continue or not.
- `render()` Prepare and structure your JSX code.
- Update child component props. Every child component who recives updates to the props will do the update lifecycle.
- `getSnapshotBeforeUpdate(prevProps, prevState)` Last-minute DOM operations.
- `componentDidUpdate(prevProps, prevState, snapshot)` Cause side-effects.

### Delete

- `componentWillUnmount()` Any code you need to run when you delete a component from the DOM.

## Functional Components Lifecycle

With React Hooks functional components has "access" to the component lifecycle.

- `useEffect` Combines all the functionallity of all class base lifecycle hooks.

If `useEffect` has the functionallity of `componentDidMount` and `componentDidUpdate` how can I isolate the different scenario cases?

```javascript
useEffect(() => {
  console.log("some stuff when characters creates/updates");
}, [characters]);

useEffect(() => {
  console.log("some stuff when characters and jobs creates/updates");
}, [characters, jobs]);

useEffect(() => {
  console.log("some stuff when application runs for the first time");
}, []);

useEffect(() => {
  console.log("some stuff running every render cycle");
});

useEffect(() => {
  console.log("some stuff when component did mount");
  return () => {
    console.log("some stuff when component did unmount");
  };
}, []);
```

You can use as many `useEffect` as you want.

## Lifecycle optimization

In order to optimize our application one thing we can do is define when the components should update or not.

Given a scenario where you update a father component the child component will get through the entire lifecycle we learn above. Event if the state/props of the child remain with the same values, it will get rerender.

For avoid this, we will use the lifecycle hook `shouldComponentUpdate`.

```javascript
shouldComponentUpdate(nextProps, nextState) {
  return nextProps.persons !== this.props.persons;
}
```

In shouldComponentUpdate we must return true/false in order to inform if the component needs to be updated and rerendered. In this case, if the prop persons (which is an array) it's the same, we don't want to waste resources rerendering this component.

### shouldComponentUpdate on functional components

For achieve the same behaviour of the shouldComponentUpdate in functional components we can use React.memo(), a high order component.

```javascript
const Card = ({ title, description }) => {
  return (
    <div>
      <div>Title: {title}</div>
      <div>Description: {description}</div>
    </div>
  );
};

export const MemoizedCard = React.memo(Card);
```

The component `Card` only will get update and rerenderized if `title` and/or `description`changes.

With `React.memo` React creates an snapshot of the props and objects and will compare it in the next cycles.

Some useful escenarios for use React.memo:

- **Pure functional components** Your component is functional and given the same props, always renders the same output. This component maybe is located inside on another component and gets rerender all the time by the changes on the parent.
- **Renders often**
- **Rerenders with the same props**

Some general rule to avoid the use of React.memo:

_Don't use memoization if you can't quantify the performance gains._ First check with profiling and get 100% sure you're getting benefits and the functionally remains correct.

### Pure Components

Extending you class based component with `PureComponent` is useful when you want to compare all the props of the component. PureComponent has built-in a shouldComponentUpdate comparing all props.

## Updating the DOM

React uses `Virtual DOM` behind the scenes. Let's see how this works:

- `shouldComponentUpdate` allows or deny the re-render.
- if step above is true, `render` (or it's equivalent from a function base component) is called.
  - In fact `render` does not render nothing at all, it's just the recommendation for the view we make.
- The `Virtual DOM` enters in action here, Virtual DOM is a Javascript representation of the original DOM, faster than the "real" DOM.
- The `old virtual DOM` is compared with the "proposed" `re-rendered virtual DOM` from the render method.
- If there is any difference... **only the things that are changed will be changed**, in this step the "real" DOM is in fact, updated.

## [Higher-Order Components](https://reactjs.org/docs/higher-order-components.html)

A Higher-Order Component or HOC is a function that takes a component and return a new (and maybe) enhanced component. They are a pattern for reusing components logic.

You can create and use HOCs in two ways:

- Functional component

```javascript
const WithClass = props => (
    <div className={props.className}>
        {props.children}
    </div>

// Usage
return (
  <WithClass className={classes.App}>
    <p>Hello there</p>
  </WithClass>
);
```

- Function HOC

```javascript
const withClass = (WrappedComponent, className) => {
  return props => (
    <div className={className}>
      <WrappedComponent {...props} />
    </div>
  );
};

//Usage
export default withClass(App, classes.App);
```

_Take special attention which attributes are used with capital letters._

One useful HOC is `Fragment`, every return/render in a component must return a single child element, if you don't want to wrap everything on a unnecesary `<div>` you can use the HOC `Fragment`.

```javascript
return (
  <React.Fragment>
    <p>Hello there</p>
    <p>I want to save one div on the DOM</p>
  </React.Fragment>
);
```

## PropTypes

PropTypes are used to typecheck the props of a component and send a warning if something is different from the setted type.

```javascript
import PropTypes from "prop-types";

Person.propTypes = {
  name: PropTypes.string,
  click: PropTypes.func,
  job: PropTypes.string,
  children: PropTypes.any,
  change: PropTypes.fun
};
```

## [Refs](https://reactjs.org/docs/refs-and-the-dom.html)

In React the normal behaviour is use props from parent to children for interaction. When you need to modify the child element, sending modified props to the children and re-render it it's the way.

With Refs you can skip the normal behaviour and interact directly with the child component, something like `document.getElementById`.

## Context

When you need to pass props from component A to D and don't want to pass it through B and C you can use `Context.Provider` on A and `Context.Consumer` on D without adding anything on B and C.

### Context creation

```javascript
import React, { createContext } from "react";

const authContext = createContext({
  authenticated: false,
  login: () => {}
});

export default authContext;
```

### Context provider

```javascript
import AuthContext from '../context/authContext';

<AuthContext.Provider value={{
  authenticated: false,
  login: () => {}
}}>
{// Every child here will get access to the context}
</AuthContext.Provider>
```

### Context consumer

```javascript
import AuthContext from "../../context/authContext";

<AuthContext.Consumer>
  {context =>
    context.authenticated ? (
      <p>Authenticated!</p>
    ) : (
      <button onClick={context.login}>Login</button>
    )
  }
</AuthContext.Consumer>;
```

### contextType

In class based components and from React 16.6 you can use a more convinient way of consuming the context.

```javascript
import AuthContext from "../../context/authContext";

static contextType = AuthContext;

{this.context.authenticated ? (
      <p>Authenticated!</p>
    ) : (
      <button onClick={this.context.login}>Login</button>
    )
  }
```

contextType will link behind the scenes the context provided by AuthContext and will be accesible like a normal prop of the class, it's a shorten way of consuming context and also you can use it anywhere on your class not only on the Consumer wrapper.

### useContext

In function based component we can't use contextType but we have React hooks. At the end, useContext hook works in the same way that contextType.

```javascript
import React, { useContext } from "react";
import AuthContext from "../../context/authContext";

const authContext = useContext(AuthContext);

{
  authContext.authenticated ? (
    <p>Authenticated!</p>
  ) : (
    <button onClick={authContext.login}>Login</button>
  );
}
```

## Planing a React App

1. Component Tree / Component Structure
2. Application Sate (Data)
3. Components vs Containers
