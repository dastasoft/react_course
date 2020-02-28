import React from 'react';
import { bool, func, string } from 'prop-types';

import classes from './Backdrop.module.css';

const backdrop = ({ show, clicked, className }) =>
    show ? (
        <div
            className={`${classes.Backdrop} ${className}`}
            onClick={clicked}
        ></div>
    ) : null;

backdrop.propTypes = {
    show: bool,
    clicked: func,
    className: string
};

backdrop.defaultProps = {
    show: false,
    clicked: () => {},
    className: ''
};

export default backdrop;
