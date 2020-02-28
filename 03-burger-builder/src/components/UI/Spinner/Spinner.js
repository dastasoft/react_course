import React from 'react';
import { string } from 'prop-types';

import classes from './Spinner.module.css';

const spinner = ({ className, text }) => (
    <div className={`${classes.Loader} ${className}`}>{text}</div>
);

spinner.propTypes = {
    className: string,
    text: string
};

spinner.defaultProps = {
    className: '',
    text: 'Loading...'
};

export default spinner;
