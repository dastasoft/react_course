import * as actionTypes from './actionsTypes';

const storeResultSync = result => {
    return {
        type: actionTypes.STORE_RESULT,
        result
    };
};

export const storeResult = result => {
    return (dispatch, getState) => {
        setTimeout(() => {
            const oldCounter = getState().ctr.counter;
            console.log('[storeResult - oldCounter]', oldCounter);
            dispatch(storeResultSync(result));
        }, 2000);
    };
};

export const deleteResult = value => {
    return {
        type: actionTypes.DELETE_RESULT,
        value
    };
};
