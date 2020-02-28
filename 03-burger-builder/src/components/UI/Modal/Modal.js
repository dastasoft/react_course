import React from 'react';
import { bool, func, node, string } from 'prop-types';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = ({ show, modalClosed, children, className }) => (
    <>
        <Backdrop show={show} clicked={modalClosed} />
        <div
            className={`${classes.Modal} ${className}`}
            style={{
                transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: show ? '1' : '0'
            }}
        >
            {children}
        </div>
    </>
);

modal.propTypes = {
    show: bool,
    modalClosed: func,
    children: node,
    className: string
};

modal.defaultProps = {
    show: false,
    modalClosed: () => {},
    children: null,
    className: ''
};

export default React.memo(modal);
