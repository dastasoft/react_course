import React from 'react';
import './Person.css';

const person = (props) => {
    return (
        <div className="Person">
            <p onClick={props.click}>I'm {props.name} and my job is {props.job}.</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.change} value={props.job}/>
        </div>
    );
};

export default person;