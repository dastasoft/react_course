import axios from 'axios';

import * as actionTypes from './actionsTypes';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = authData => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData
    };
};

const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    };
};

export const auth = (email, password) => dispatch => {
    dispatch(authStart());
    const authData = {
        email,
        password,
        returnSecureToken: true
    };

    axios
        .post(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBe0_lTewPGad4ZcrPZoegGbOfHQpUo2Nc',
            authData
        )
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data));
        })
        .catch(error => {
            console.log(error);
            dispatch(authFail(error));
        });
};
