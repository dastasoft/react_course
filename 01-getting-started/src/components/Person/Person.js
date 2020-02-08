import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WithClass from '../../hoc/WithClass';

import classes from './Person.css';

class Person extends Component {
    componentDidMount() {
        this.inputElement.focus();
    }

    render() {
        console.log('[Person.js] rendering...');
        return (
            <WithClass className={classes.Person}>
                <p onClick={this.props.click}>I'm {this.props.name} and my job is {this.props.job}.</p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.change} value={this.props.job} ref={(inputEl) => this.inputElement = inputEl} />
            </WithClass>
        );
    }
};

Person.propTypes = {
    name: PropTypes.string,
    click: PropTypes.func,
    job: PropTypes.string,
    children: PropTypes.any,
    change: PropTypes.fun
}

export default Person;