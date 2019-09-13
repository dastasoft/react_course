import React from 'react';

import classes from './Person.css';

const person = (props) => {
    return (
        <div className={classes.Person}>
            <p onClick={props.click}>I'm {props.name} and my job is {props.job}.</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.change} value={props.job}/>
        </div>
    );
};

export default person;