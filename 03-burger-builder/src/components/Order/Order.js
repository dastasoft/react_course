import React from 'react';

import classes from './Order.module.css';

const order = props => {
    console.log(props);
    return (
        <div className={classes.Order}>
            <p>
                Ingredients:{' '}
                {Object.keys(props.ingredients).map(ingredient => (
                    <span className={classes.Ingredients} key={ingredient}>
                        {ingredient} ({props.ingredients[ingredient]})
                    </span>
                ))}
            </p>
            <p>
                Price: <strong>USD {parseFloat(props.price).toFixed(2)}</strong>
            </p>
        </div>
    );
};

export default order;
