import React from 'react';

const userInput = (props) => {
    const style = {
        boxShadow: '0 2px 3px #ccc',
        border: '1px solid blue',
        margin: 'auto',
        padding: '16px',
        textAlign: 'center',
        display: 'block'
    };

    return (
            <input 
                type="text" 
                onChange={props.updateUsername} 
                value={props.username}
                style={style}
            />
    );
};

export default userInput;