import React, { Component } from 'react';

class Course extends Component {
  state = {
    courseTitle: ''
  };

  componentDidMount() {
    this.parseQueryParams();
  }

  componentDidUpdate() {
    this.parseQueryParams();
  }

  parseQueryParams() {
    const query = new URLSearchParams(this.props.location.search);

    for (let param of query.entries()) {
      if (param[0] === 'title' && courseTitle !== param[1])
        this.setState({ courseTitle: param[1] });
    }
  }

  render() {
    return (
      <div>
        {/*<h1>{this.props.match.params.title}</h1>*/}
        <h1>{courseTitle}</h1>
        <p>You selected the Course with ID: {this.props.match.params.id}</p>
      </div>
    );
  }
}

export default Course;
