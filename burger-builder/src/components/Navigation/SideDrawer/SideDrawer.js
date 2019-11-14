import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = props => {
    const attachedClases = props.open
        ? [classes.SideDrawer, classes.Open]
        : [classes.SideDrawer, classes.Close];
    return (
        <>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClases.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </>
    );
};

export default sideDrawer;
