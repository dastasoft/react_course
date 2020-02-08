import React, { Component } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  NavLink,
  Redirect
} from 'react-router-dom';

import Courses from './containers/Courses/Courses';
import Users from './containers/Users/Users';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <ol style={{ textAlign: 'left' }}>
            <li>
              <del>
                Add Routes to load "Users" and "Courses" on different pages (by
                entering a URL, without Links)
              </del>
            </li>
            <li>
              <del>
                Add a simple navigation with two links => One leading to
                "Users", one leading to "Courses"
              </del>
            </li>
            <li>
              <del>
                Make the courses in "Courses" clickable by adding a link and
                load the "Course" component in the place of "Courses" (without
                passing any data for now)
              </del>
            </li>
            <li>
              <del>
                Pass the course ID to the "Course" page and output it there
              </del>
            </li>
            <li>
              <del>
                Pass the course title to the "Course" page - pass it as a param
                or score bonus points by passing it as query params (you need to
                manually parse them though!)
              </del>
            </li>
            <li>
              <del>
                Load the "Course" component as a nested component of "Courses"
              </del>
            </li>
            <li>
              <del>
                >Add a 404 error page and render it for any unknown routes
              </del>
            </li>
            <li>
              <del>
                Redirect requests to /all-courses to /courses (=> Your "Courses"
                page)
              </del>
            </li>
          </ol>

          <nav>
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/courses">Courses</NavLink>
          </nav>

          <Switch>
            <Route path="/" exact component={Courses} />
            <Route path="/users" component={Users} />
            <Route path="/courses" component={Courses} />
            <Redirect from="/all-courses" to="/courses" />
            <Route
              render={() => <div className="not-found">Page not found!</div>}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
