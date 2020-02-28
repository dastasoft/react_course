import React from 'react';
import { bool, object, string, func } from 'prop-types';

import classes from './Input.module.css';

const input = ({
    invalid,
    shouldValidate,
    touched,
    elementType,
    elementConfig,
    value,
    changed,
    label,
    className
}) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement, className];

    if (invalid && shouldValidate && touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (elementType) {
        case 'input':
            inputElement = (
                <input
                    className={inputClasses.join(' ')}
                    {...elementConfig}
                    value={value}
                    onChange={changed}
                />
            );
            break;
        case 'textarea':
            inputElement = (
                <textarea
                    className={inputClasses.join(' ')}
                    {...elementConfig}
                    value={value}
                    onChange={changed}
                />
            );
            break;
        case 'select':
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={value}
                    onChange={changed}
                >
                    {elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = (
                <input
                    className={inputClasses.join(' ')}
                    {...elementConfig}
                    value={value}
                    onChange={changed}
                />
            );
            break;
    }

    let validationError = null;
    if (invalid && touched) {
        validationError = (
            <p className={classes.ValidationError}>
                Please enter a valid value.
            </p>
        );
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{label}</label>
            {inputElement}
            {validationError}
        </div>
    );
};

input.propTypes = {
    invalid: bool,
    shouldValidate: object,
    touched: bool,
    elementType: string,
    elementConfig: object,
    value: string,
    changed: func,
    label: string,
    className: string
};

input.defaultProps = {
    invalid: false,
    shouldValidate: {},
    touched: false,
    elementType: '',
    elementConfig: {},
    value: '',
    changed: () => {},
    label: '',
    className: ''
};

export default input;
