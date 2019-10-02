import React, { useEffect } from 'react';

import classes from './Cockpit.css';

const cockpit = ({ title, charactersLength, showPersons, switchJobHandler, changeNamesHandler, togglePersonsHandler }) => {
    useEffect(() => {
        console.log('[Cockpit.js useEffect]');
        return () => {
            console.log('[Cockpit.js] cleanup work in useEffect');
        };
    }, []);
    
    const classesApplied = [];
    let btnClass = '';

    if (!showPersons)  btnClass = classes.Green;

    if (charactersLength <= 2) {
        classesApplied.push(classes.red);

        if (charactersLength <= 1) {
            classesApplied.push(classes.bold);
        }
    }

    return (
        <div className={classes.Cockpit}>
            <h1>{title}</h1>
            <p className={classesApplied.join(' ')}>This is really working!</p>
            <div className={classes.buttons}>
                <button
                    className={btnClass}
                    onClick={switchJobHandler}>Switch Jobs</button>
                <button
                    className={btnClass}
                    onClick={changeNamesHandler.bind(this, 'Leon', 'Ultimecia', 'Chicken Wuss')}>Change Names</button>
                <button
                    className={btnClass}
                    onClick={togglePersonsHandler}>Toggle Characters</button>
            </div>
        </div>
    );
};

export default cockpit;