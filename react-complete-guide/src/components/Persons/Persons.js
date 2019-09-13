import React from 'react';
import Person from '../Person/Person';

const persons = ({ persons, click, change }) => persons.map((person, index) => {
    return (<Person
        click={() => click(index)}
        change={event => change(event, person.id)}
        name={person.name}
        job={person.job}
        key={person.id} 
        />);
});

export default persons;