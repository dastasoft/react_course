import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionTypes from '../../store/actions';

class Counter extends Component {
    render() {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl
                    label="Increment"
                    clicked={this.props.onIncrementCounter}
                />
                <CounterControl
                    label="Decrement"
                    clicked={this.props.onDecrementCounter}
                />
                <CounterControl
                    label="Add 5"
                    clicked={() => this.props.onAddCounter(5)}
                />
                <CounterControl
                    label="Subtract 5"
                    clicked={() => this.props.onSubtractCounter(5)}
                />
                <hr />
                <button
                    onClick={() => this.props.onStoreResult(this.props.ctr)}
                >
                    Store Result
                </button>
                <ul>
                    {this.props.storedResults.map(result => (
                        <li
                            key={result.id}
                            onClick={() => this.props.onDeleteResult(result.id)}
                        >
                            {result.value}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ctr: state.ctr.counter,
        storedResults: state.res.results
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({ type: actionTypes.INCREMENT }),
        onDecrementCounter: () => dispatch({ type: actionTypes.DECREMENT }),
        onAddCounter: value => dispatch({ type: actionTypes.ADD, value }),
        onSubtractCounter: value =>
            dispatch({ type: actionTypes.SUBTRACT, value }),
        onStoreResult: result =>
            dispatch({ type: actionTypes.STORE_RESULT, result }),
        onDeleteResult: value =>
            dispatch({ type: actionTypes.DELETE_RESULT, value })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
