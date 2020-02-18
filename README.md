# React Course

My progress on Udemy's React course from Maximilian Schwarzmüller

- [React Course](#react-course)
  - [Create React App](#create-react-app)
    - [Starting the app](#starting-the-app)
    - [Project directory structure](#project-directory-structure)
  - [JSX](#jsx)
    - [Dynamic Content](#dynamic-content)
  - [Components](#components)
    - [Functional Components](#functional-components)
    - [Class-base Components](#class-base-components)
    - [Import Component](#import-component)
    - [Passing Properties](#passing-properties)
    - [Passing functions as properties](#passing-functions-as-properties)
    - [State propertie](#state-propertie)
    - [Event Listeners](#event-listeners)
  - [Render conditional content](#render-conditional-content)
  - [Render List](#render-list)
    - [Key property](#key-property)
  - [Styling](#styling)
    - [Fixing in line style](#fixing-in-line-style)
      - [Using media queries](#using-media-queries)
    - [Dynamically assign classes](#dynamically-assign-classes)
    - [CSS Modules](#css-modules)
    - [Styled Components](#styled-components)
      - [Dynamic Styles](#dynamic-styles)
  - [Error Boundaries](#error-boundaries)
  - [Component Lifecycle](#component-lifecycle)
    - [Creation](#creation)
    - [Update](#update)
    - [Delete](#delete)
  - [Functional Components Lifecycle](#functional-components-lifecycle)
  - [Lifecycle optimization](#lifecycle-optimization)
    - [shouldComponentUpdate on functional components](#shouldcomponentupdate-on-functional-components)
    - [Pure Components](#pure-components)
  - [Updating the DOM](#updating-the-dom)
  - [Higher-Order Components](#higher-order-components)
  - [PropTypes](#proptypes)
  - [Refs](#refs)
  - [Context](#context)
    - [Context creation](#context-creation)
    - [Context provider](#context-provider)
    - [Context consumer](#context-consumer)
    - [contextType](#contexttype)
    - [useContext](#usecontext)
  - [Planing a React App](#planing-a-react-app)
  - [HTTP / AJAX](#http--ajax)
    - [axios](#axios)
      - [Interceptors](#interceptors)
      - [Default properties](#default-properties)
      - [axios instances](#axios-instances)
  - [Routing](#routing)
    - [BrowserRouter vs HashRouter](#browserrouter-vs-hashrouter)
    - [Route](#route)
      - [Route component props](#route-component-props)
      - [Passing parameters](#passing-parameters)
    - [Link](#link)
      - [Retrieve parameters](#retrieve-parameters)
      - [Relative paths](#relative-paths)
    - [NavLink](#navlink)
      - [Navigating Programmatically](#navigating-programmatically)
    - [Switch](#switch)
    - [Redirect](#redirect)
    - [Handling 404](#handling-404)
    - [Setting the base path](#setting-the-base-path)
  - [Lazy Load](#lazy-load)
  - [Redux](#redux)
    - [Workflow](#workflow)
      - [Central Store](#central-store)
      - [Actions](#actions)
      - [Reducers](#reducers)
      - [Subscriptions](#subscriptions)
    - [Connecting Redux to React](#connecting-redux-to-react)
    - [Outsourcing actions](#outsourcing-actions)
    - [Using multiple reducers](#using-multiple-reducers)
    - [Attaching Redux DevTools Extension](#attaching-redux-devtools-extension)

## [Create React App](https://github.com/facebook/create-react-app)

Instead of build a new project from scratch and configure everything, we will use Create React App which comes with all ready to go.

```sh
npm install create-react-app -g
```

**(-g for globally instalation)**
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

**Remember that the div with the root id is where all the components are rendered.**

In the `src` folder goes the logic and style of the app. Inside of `index.js` you can find the _magic_ which links the root id division with the components:

```javascript
ReactDOM.render(<App />, document.getElementById('root'));
```

**The usually workflow is only the main App goes to root and inside of that main App we will nest the other components which can have other component nested too.**

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

JSX stands for Javascript XML and allow us to write "HTML" in React. The use of JSX is not mandatory but is the standard nowadays for React usage.

For example:

```jsx
<div className="App">
  <h1>Hi, I'm a React App.</h1>
</div>
```

The above JSX is converted behind the scenes into this JS:

```javascript
React.createElement(
  'div',
  { className: 'App' },
  React.createElement('h1', null, "Hi, I'm a React App.")
);
```

**It is a good practice to wrap all elements of the JSX in one root element, the div in this case.**

_Since JSX is closer to JS than to HTML, React DOM uses `camelCase` property naming convention instead of HTML attribute names. For `class` it becomes `className` because class is a keyword of the JS language_

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
import React from 'react';

const person = () => {
  return <p>I'm a person!</p>;
};

export default person;
```

**Remember we import React because we are using JSX and this behind the scenes is translate with `React.createlement`**

Functional components does not have access to `Lifecycle Hooks` and the access to the state is only from React v16.8+ with the inclusion of Hooks with `useState()`.

The access to the props is done by `props.someProperty`.

### Class-base Components

If your components need more functionality, like keeping state, use class-base components instead.

One good example is the `App.js` already created

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

Class-based components has access to the state and lifecycle hooks in any version of React.

The access to the state and props is done with `this` keyword:

```javascript
this.state.someValue;
this.props.someProperty;
```

### Import Component

If we want to use the `Person` component into the `App` component we need to import the component and use it as a HTML tag

```javascript
import Person from './Person/Person';

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

**If we are using a class-base component it will be `this.props`**

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
    characters: [{ name: newName, job: 'Samurai' }]
  });
};
```

In order to pass `newName` to the `swiitchNameHandler` we must bind it

```javascript
<button onClick={this.switchNameHandler.bind(this, 'Leon')}>Switch Name</button>
```

Or use an arrow function

```javascript
<button onClick={() => this.switchNameHandler('Leon')}>Switch Name</button>
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
    { name: 'Squall', job: 'Samurai' },
    { name: 'Rinoa', job: 'Witch' },
    { name: 'Zell', job: 'Duelist' }
  ]
});
```

**Do NOT mutate the state directly, React will ignore the changes. Instead use `this.setState()`**

**Keep in mind any changes to props and/or state trigger React to re-render your components an ppotentially update the DOPM in the browser.**

### Event Listeners

Let's put an example with the `onclick` event.

On our class-base component we create:

```jsx
switchJobHandler = () => {
  console.log('Was clicked!');
};

<button onClick={this.switchJobHandler}>Switch Jobs</button>;
```

Here are three important things:

- The function is declarated with ES6 syntax because it's inside of a class and if you do a normal function declaration, later on you will face problems with `this` keyword. (Normal functions create a new this scope for themselves, arrow functions instead shares the scope of this with the parent.).
- The onclick event in JSX is `camelCase`. Remember **this is not HTML**.
- The function is written without () because we don't want to call it when the UI is rendered, for that we only pass the function and when onclick is triggered the call is done.

You can see a complete list of Reac supported events [here](https://reactjs.org/docs/events.html#supported-events).

## Render conditional content

If you want render content in some scenarios you can wrap the code in JSX with {} and add a simple statement **If/else blocks does not work here**

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

For render lists on React we will use the provided methods in JS

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

When work with list you need to specify a key in order to inform React changes or which components are present on the screen. The `key` property has not be specified into the component because React always expects it but you must pass as an attribute. **Remember that the key must be an unique identifier.**

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

**When Webpack add your css into the header of main HTML will be prefixing the css in order to work in all browsers.**

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

**Remember is a JS object not a CSS, for that reason `camelCase` instead of dashes.**

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
import Radium from 'radium';

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
};
```

Remember the properties of a JS object can be defined with strings too, normally used this way if contain invalid caracters (like de `:`). Later on, when you want to manage that property, must be used with `[]`.

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
const classes = ['red', 'bold'].join(' '); // 'red bold' Valid CSS

<p className={classes}>Test</p>;
```

Fill the array in the statements you want, but in the end you must have a valid css.

If you use in line style, it's a JS object.

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

<p style={style}>Test</p>;
```

### [CSS Modules](https://github.com/css-modules/css-modules)

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

### [Styled Components](https://styled-components.com/)

Utilising tagged template literals (a recent addition to JS) and the power of CSS, styled-components allows you to write actual CSS code to style your components.

First of all, add to your project:

```javascript
yarn add styled-components
```

The idea behind styled-compoents is using **template literals** to style your components. When you're defining your styles, you're actually creating a normal React component, that has your styles attached to it.

```javascript
import styled from 'styled-components';

const StyledDiv = styled.div`
width: 60%;
margin: 16px auto;
border: 1px solid #eee

@media (min-width: 500px) {
  width: 450px;
}
`;
```

The example above creates a div with some CSS in it, `styled.div` will return a React component, so if you want to use it in the same file:

```javascript
<StyledDiv>Some content into the styled div</StyledDiv>
```

You can style custom components in a similar way:

```javascript
import styled from 'styled-components';

const StyledMyCustomComponent = styled(MyCustomComponent)`
width: 60%;
margin: 16px auto;
border: 1px solid #eee

@media (min-width: 500px) {
  width: 450px;
}
`;

<StyledMyCustomComponent>Some content into the styled div</StyledMyCustomComponent>
```

There are some key features you must know:

- The CSS rules are automatically vendor prefixed, forget about writing the same flex, transition or other properties multiple times!
- Class names are scoped to the component, like in **CSS Modules** the names you use in styled-components are "only" available for that component.

There's one downside using CSS inside the template literals, no syntax highlight, here are the VSCode extension I use to have regular CSS highlight syntax [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components)

#### Dynamic Styles

You can pass a function to a styled component's template literal to adapt it based on its props.

```javascript
import styled from 'styled-components';

const StyledDiv = styled.div`
width: 60%;
margin: 16px auto;
border: 1px solid ${props => props.isBlack ? 'black' : 'white'}

@media (min-width: 500px) {
  width: 450px;
}
`;

<StyledDiv isBlack={this.state.isBlack}>Some content into the styled div</StyledDiv>
```

In the example above we pass a new prop to the `StyledDiv`, we can use that prop in a function ("interpolation") inside of the template literal and dice which string we want to return.

## [Error Boundaries](https://reactjs.org/docs/error-boundaries.html)

When something went wrong you may want to display a custom HTML, for that you can wrap your code with a custom component which handles this. I'll call it `ErrorBoundary.js` but the name is up to you.

```javascript
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state: {
    hasError: false,
    errorMessage: ''
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
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

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
  console.log('some stuff when characters creates/updates');
}, [characters]);

useEffect(() => {
  console.log('some stuff when characters and jobs creates/updates');
}, [characters, jobs]);

useEffect(() => {
  console.log('some stuff when application runs for the first time');
}, []);

useEffect(() => {
  console.log('some stuff running every render cycle');
});

useEffect(() => {
  console.log('some stuff when component did mount');
  return () => {
    console.log('some stuff when component did unmount');
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

**Don't use memoization if you can't quantify the performance gains.** First check with profiling and get 100% sure you're getting benefits and the functionally remains correct.

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

**Take special attention which attributes are used with capital letters.**

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
import PropTypes from 'prop-types';

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
import React, { createContext } from 'react';

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
import AuthContext from '../../context/authContext';

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
import React, { useContext } from 'react';
import AuthContext from '../../context/authContext';

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

## HTTP / AJAX

In a SPA tipically the comunication with the server will be through sending/recieving JSON Data instead of new HTML pages.

In order to perform HTTP request we can use:

- `XMLHttpRequest` built-in Javascript, construct your own AJAX request, send to specific URL and handle the response data.
- [axios](https://github.com/axios/axios) third party Javascript library, can be used in any Javascript code, is not related to React.

### [axios](https://github.com/axios/axios)

```javascript
// Make a request for a user with a given ID
axios
  .get('/user?ID=12345')
  .then(function(response) {
    // handle success
    console.log(response);
  })
  .catch(function(error) {
    // handle error
    console.log(error);
  })
  .finally(function() {
    // always executed
  });
```

```javascript
// Performing a POST request
axios
  .post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
```

Second parameter is an JS object that axios will convert to a JSON.

#### Interceptors

Configure global interceptors for logging and handle request/response globally.

On the `index.js` place the interceptors:

```javascript
axios.interceptors.request.use(
  request => {
    console.log(request);
    // Edit request config
    return request;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    console.log(response);
    // Edit response config
    return response;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);
```

This automatically will catch the request and response events from `axios`.

In case you want to delete interceptors at any given time:

```javascript
 const myInterceptor = axios.interceptors.request.use(function () {...});
 axios.interceptors.request.eject(myInterceptor);
```

#### Default properties

You can change default properties in order to specify a base url for all the axios events, put your own authorization token, etc.

```javascript
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.commmon['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';
```

#### axios instances

Create a `axios.js` file with:

```javascript
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorization'] = 'ANOTHER AUTH TOKEN';

// instance.interceptors.re...

export default axiosInstance;
```

Importing `axiosInstance` will use other instance of the globally defined axios.

## Routing

React Router is the de-facto React routing library, it's built on top of React and not built-in React, so you need to install:

```bash
yarn add react-router-dom
```

React Router offers a way to write your code code so that it will show certain components of your app only if the route matches what you define.

Routing in a SPA with React Router will have the expected behaviours of a normal web application:

- URL may change when you navigate to a "different" screen
- The navigation buttons in the browser will work as expected

To use a router, just make sure it is rendered at the root of your element hierarchy. Typically you'll wrap your top.level `<App>` element in a router, like this:

```javascript
import { BrowserRouter } from 'react-router-dom';

<BrowserRouter>
  <div className="App">
    // Stuff here
  </div>
</BrowserRouter>
```

### BrowserRouter vs HashRouter

At the core of every React Router application should be a router component. The main difference between the two is the way they store the URL and communicate with your web server.

- `<BrowserRouter>` uses regular URL paths. These are generally **the best-looking URLs**, but they require your server to be configured correctly.
- `<HashRouter>` stores the current location in **the hash portion of the URL**, so the URL looks something like `http://example.com/#/your/page`. Since the hash is never sent to the server, this mean that no special server configuration is needed.

### Route

You can use `Route` component anywhere on your project, react-router will check if the parameters given to the component if true and display the content.

```javascript
<Route path="/" exact render={() => <h1>Home</h1>} />
<Route path="/" exact component={MyComponent} />
```

**If you have multiple routes, it will be parsed top to bottom.**

Following the example above:

- `path` stands for if the URL **starts with** the given value.
- `exact` is a boolean property which turns the starts with to **if the full URL is the same than the value in the path property**.
- `render` will display the JSX content passed in.
- `component` will render a component, the component must be imported first.

Using `render` instead of `component` can be useful when you want to pass props into the component.

```javascript
<Route path="/" exact render={() => <MyComponent myProps={someProps} />} />
```

#### Route component props

The component rendered within `component` attribute will recieve the following additional props:

- `history` This refers to the `history package`, which is one of the major dependencies of react-router. The history library lets you easily manage session history anywhere JS runs. `history` abstract away the differences in various environments and provides a minimal API that lets you manage the history stack, navigate, and persist state between sessions.
- `location` represents where the app is now, where you want it to go, or even where it was.
- `match` contains information about how `<Route path>` matched the URL.
- `staticContext`

This props are only available for the first component passed in the `component` attribute, **child components will not recieve this props at least you pass it manually**.

In order to pass the props to the child components, you can do it in two ways:

- Passing props parent to child like you would do normally

```javascript
const MyComponent = props => (
  <MyChildComponent location={props.location}>
)
```

- Using HOC `withRouter` to turn the child component 'route aware'.

```javascript
import { withRouter } from 'react-router-dom';

const MyChildComponent = props => {
  console.log(props.location)
  // Stuff here
}

export default withRouter(MyChildComponent);
```

#### Passing parameters

You can define certain parameters in the path's route in order to tell rect-router there must be a dynamic value.

```javascript
<Route path="/posts/:id" exact component={MyComponent} />
```

The name after the `:` will be sent through the `props.match.params`.

In order to define multiple parameters:

```javascript
<Route path="/posts/:id/:title" exact component={MyComponent} />
```

You can define `optional parameters` too with `?`:

```javascript
<Route path="/posts/:id?/:title?" exact component={MyComponent} />
```

### Link

Using an `<a>` to move around our web can work but that type of element will reload the page and that means all of our Javascript will be initialized again and a request will send to the server.

In React if a user is navigating through our web we want only to re-render and not to reload the entire web page, for that we will use a special component of the react-router, the `Link`.

In order to use Link:

```javascript
import { Link } from 'react-router-dom';

<Link to="/" exact>Home</Link>

```

Internally react-router will generate an anchor element in the HTML but will prevent the default behaviour and handle the click by itself. The `to` attribute will redirect to the given value as `href` in an anchor element.

The Link component also supports the `exact` attribute that have the same behaviour that in the Route component.

The `Link` component can be declared as follows too:

```javascript
<Link
  to={{
    pathname: '/new-post',
    hash: '#submit',
    search: '?quick-submit=true'
  }}
>
  New Post
</Link>
```

- `pathname` will have the same effect than `to` in the example above.
- `hash` will be at the and of the URL and serves as a jump to that ID element.
- `search` can introduce query params to the URL.

#### Retrieve parameters

If you want to retrieve the `hash` parameter simply access to `props.location.hash`.

For the `search` access to `props.location.search`, this will return a string containing ? and = too, use this snippet which allows you to easily extract the valuable information:

```javascript
const query = new URLSearchParams(this.props.location.search);
for (let param of query.entries()) {
  console.log(param);
}
```

#### Relative paths

By default the pathname is an absolute path.

```javascript
<Link
  to={{
    pathname: 'new-post',
    hash: '#submit',
    search: '?quick-submit=true'
  }}
>
  New Post
</Link>
```

In the example above, is the same `/new-post` or `new-post`, the two will be appended to domain + path.

In order to set a relative path you can do the following:

```javascript
<Link
  to={{
    pathname: props.match.url + '/new-post',
    hash: '#submit',
    search: '?quick-submit=true'
  }}
>
  New Post
</Link>
```

If the component is route aware, you can get the match property and set the pathname to the entire new relative URL.

### NavLink

A special version of the `<Link>` that will add styling attributes to the rendered element when it matches the current URL.

By default automatically will be attach an `active` class name. If you want to define your custom active class:

```javascript
import { NavLink } from 'react-router-dom';

<NavLink to="/" exact activeClassName="my-custom-active-class">Home</NavLink>
```

You can define your active in-line style too:

```javascript
import { NavLink } from 'react-router-dom';

<NavLink to="/" exact activeStyle={{ color: 'black', textDecoration: 'underlined' }}>Home</NavLink>
```

#### Navigating Programmatically

Instead of set a `Link` component with `to` attribute we can make navigation programmatically:

```javascript
const onClickHandler = id => {
  props.history.push({ pathname: '/somewhere/' + id});
}

return (
  <MyChildComponent onClick={() => onClickHandler(id)}>
)
```

### Switch

The `Switch` component tells to the react-router to display only one of the given `Routes`. Besides Switch component, the Routes are still parsed top to bottom.

```javascript
import { Switch } from 'react-router-dom';

<Switch>
  <Route path="/" exact component={Posts} />
  <Route path="/new-post" component={NewPost} />
  <Route path="/posts/:id" exact component={FullPost} />
</Switch>
```

### Redirect

Render a `Redirect` component will navigate to a new location. The new location will override the current location in the history slack.

```javascript
import { Redirect } from 'react-router-dom';

<Switch>
  <Route path="/posts" component={Posts} />
  <Redirect from="/" to="/posts" />
</Switch>
```

**If `Redirect` is outside of `Switch`, `from` can't be specified.**

You can achieve the same behaviour by duplicatting the Routes:

```javascript
<Switch>
  <Route path="/posts" component={Posts} />
  <Route path="/" component={Posts} />
</Switch>
```

**This approach will not modify the URL.**

Another way to achieve redirection is using the `history` prop we saw above.

```javascript
this.props.history.push('/posts');
```

Using this approach you can use the **navigation back** to return to the previous screen, with `Redirect` you can't do it because is replacing the URL not pushing on the `history` stack.

**If you want to achieve the exact same effect with `history` and `Redirect` use `replace()` instead of `push()`.**

### Handling 404

Previously we saw the `Redirect` component.

```javascript
<Redirect from="/" to="/posts" />
```

With the example above, any route that is unknown will be redirected to `/posts` but if we want to send the user to a **Not Found** page:

```javascript
<Route component={My404} />
```

Replacing the `Redirect` with a `Route` without path will handle all the routes that are unmatched in the list (remember that routes are parsed top to bottom) and send to the component.

### Setting the base path

If your app is served from a sub-directory on your server, you'll want to set this to the sub-directory.

By default the `basename` property is `/`:

```javascript
<BrowserRouter basename="/">
// Some stuff here
</BrowserRouter>
```

For example if your app is on `example.com/my-app` you'll need this configuration:

```javascript
<BrowserRouter basename="/my-app">
// Some stuff here
</BrowserRouter>

<Link to ="/posts" />
```

The `Link` will render an `<a href="/my-app/posts">`.

**A properly formatted basename should have a leading slash, but no trailing slash.**

## Lazy Load

On React v16.6 `lazy` load was introduced. In bigger applications you want to optimize as much as possible and one thing to do is loading components (specially the bigger ones) only when they are needed, that is a lazy load.

`React.lazy` function lets you render a dynamic import as a regular component.

```javascript
import React, { Suspense } from 'react';

const Post = React.lazy(() => import('./components/Post'));

const MyComponent = () => {
  return <Route path="/post" render={() => (
    <Suspense fallback={<div>Loading...</div>}>
      <Post />
    </Suspense>
  )}>
}
```

Only when the user goes to `/post` all the code related to `Post` component will load.

`React.lazy` takes a function that must call a dynamic `import()`. This must return a `Promise`which resolves to a module with a `default` export containing a React component.

The component loaded in lazy should be inside a `Suspense` component which has a `fallback` props that accepts any React elements that will be displayed until the component is loaded.

**You can wrap multiple lazy components with a single `Suspense` component.**

## [Redux](https://redux.js.org/)

Redux is a third-party package independant from React (but mostly used with React) that is a state container for JS apps.

For install Redux use:

```bash
npm install --save redux

yarn add redux
```

### Workflow

First we need to understand the Redux's worklow (the example will be focus on a React environment):

#### Central Store

We have a **Cental Store** which stores the entire application state, think about it as a large JS object. The store has the following responsabilities:

- Holds application state.
- Allows access to ttate via `getState()`.
- Allows state to be updated via `dispatch(action)`.
- Registers listeners via `subscribe(listener)`.
- Handles unregistering of listeners via the function returned by `subscribe(listener)`.

In React we have **Components** that may want **manipulate app state**, they do through **Dispatches**.

#### Actions

Redux's **Actions** will recieve **dispatches** from Components, this actions are payloads of information, they are plain JS objects and must have a `type` property that indicates the type of action being performed.

Other than type, the srructure of an action object is really up to you.

If you're interested, check out [Flux Standard Action](https://github.com/acdlite/flux-standard-action) for recommendations on how actions could be constructed.

#### Reducers

Redux also have **Reducers**  which specify how the application's state changes in response to **actions**. They recieve actions and updates the **State** (pure, sync functions, no side-effects!).

If the actions represents what happened, reducers describes **how the application's state changes**.

#### Subscriptions

Once the **Store** is updated through the **Reducer** the component which dispatched the **Action** needs to be aware of the changes, for that the component must be **Subscribed** to recieve the update state of the application.

Here you can check a summary example made in NodeJS:

```javascript
const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
    counter: 0
};

// Reducer
const rootReducer = (state = initialState, action) => {
    if (action.type === 'INC_COUNTER') {
        return {
            ...state,
            counter: state.counter + 1
        };
    }

    if (action.type === 'ADD_COUNTER') {
        return {
            ...state,
            counter: state.counter + action.value
        };
    }
    return state;
};

// Store
const store = createStore(rootReducer);
console.log('[Store initialization]', store.getState());

// Subscription
store.subscribe(() => {
    console.log('[Subscription]', store.getState());
});

// Dispatching Action
store.dispatch({ type: 'INC_COUNTER' });
store.dispatch({ type: 'ADD_COUNTER', value: 10 });
console.log('[Dispatched actions]', store.getState());
```

- The **store creation** needs a **reducer**.
- The **reducer** will have the `initialState` if no other state is provided. Depend of the **action** will modify (**in a inmutable way**) the state.
- The **action** will be **dispatched** always with a JS object which has `type` and may have a payload, it can have any form you want.
- The **store** has **subscriptions** which will react to any changes.

### Connecting Redux to React

React bindings are not included in Redux by default. You need to install them explicitly:

```bash
yarn add react-redux

npm install --save react-redux
```

After installing `redux` and `react-redux` to our project, we add the following lines to the `index.js`:

```javascript
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer';

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
```

We just learn that the store creation needs a `reducer` for that we create the `reducer.js`.

```javascript
const initialState = {
    counter: 0
};

const reducer = (state = initialState, action) => {
    if(action.type === 'INCREMENT') {
      return {
        counter: state.counter + 1
      };
    }

    return state;
};

export default reducer;

```

The `Provider` comes from `react-redux` and needs our `store` as a prop, this will provide context to our all application but we need to do more stuff in the components to gain access to the store.

```javascript
import React from 'react';
import { connect } from 'react-redux';

const MyComponent = props => {
  return (
    <div>
      <span>
        Useful component which has {props.myCustomCounter}
      </span>
      <button onClick={props.onIncrementCounter}>Fancy Button</button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    myCustomCounter: state.counter
  };
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({ type: 'INCREMENT' })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent)
```

In our component we import the `connect` function, this function will return another function which will take our component as a parameter.

The parameters for the `connect` function are `mapStateToProps` and `mapDispatchToProps`, the names are up to you but you will saw this names in general.

The `mapStateToProps` will take some parts of the general state provided by redux and "map" to the props of the component.

In a large application you will take some pieces of the state for each component instead of managing the entire state in every component.

The `mapDispatchToProps` will specify which actions the component can make.

If your component only have actions and no need access to the state at all you can do the following:

```javascript
export default connect(null, mapDispatchToProps)(MyComponent)
```

### Outsourcing actions

Actions are dispatched and recieved through strings which can be a good place to introduce bugs by typos, for that we want to outsource actions and add more security to this.

In a separate JS file:

```javascript
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
```

**Names are up to you but it's common to have both names equal.**

Now on every place we use actions:

```javascript
import * as actionTypes from './actions';

if (action.type === actionTypes.INCREMENT) {
  console.log('Plus One')
}
```

With this, if we type wrong the constant, we get an error and will be aware that some action will not work.

### Using multiple reducers

Redux has one feature to combine multiple reducers in one:

```javascript
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultReducer
});

const store = createStore(rootReducer);
```

When combine multiple reducers the access to the state changes too:

```javascript
const mapStateToProps = state => {
    return {
        counter: state.ctr.counter,
        storedResults: state.res.results
    };
};
```

Now on the global state, we have access to the two pieces of the state we created above, this is done by `combineReducers` in order to avoid same names in different reducers collide.

### Attaching [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)

For using Redux DevTools Extension and see changes on the store in the dev tools you need to add this in the store creation:

```javascript
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
```
