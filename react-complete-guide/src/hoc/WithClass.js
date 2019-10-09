import React from 'react';

const WithClass = props => (
    <div className={props.className}>
        {props.children}
    </div>
);

// HOC function
const withClass = (WrappedComponent, className) => {
    return props => (
        <div className={className}>
            <WrappedComponent />
        </div>
    );
}
// Usage: export default withClass(App, classes.App)

export default WithClass;
