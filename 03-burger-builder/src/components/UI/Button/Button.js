import React from 'react';
import { bool, func, node, string } from 'prop-types';

import classes from './Button.module.css';

const button = ({ disabled, clicked, children, btnType, className }) => (
    <button
        disabled={disabled}
        className={[classes.Button, classes[btnType], className].join(' ')}
        onClick={clicked}
    >
        {children}
    </button>
);

button.propTypes = {
    disabled: bool,
    clicked: func,
    children: node,
    btnType: string,
    className: string
};

button.defaultProps = {
    disabled: false,
    clicked: () => {},
    children: null,
    btnType: '',
    className: ''
};

export default button;
