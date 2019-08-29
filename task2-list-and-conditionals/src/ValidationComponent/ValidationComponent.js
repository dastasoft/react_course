import React from 'react';

const validationComponent = (props) => {
    const MIN_LENGTH = 5;
    const textLength = props.textLength >= MIN_LENGTH ? 'Text long enough' : 'Text too short';

    return (
        <p>{textLength}</p>
    );
};

export default validationComponent;
