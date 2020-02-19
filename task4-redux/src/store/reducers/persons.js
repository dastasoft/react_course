import * as actionTypes from '../actions/actions';

const initialState = {
    persons: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PERSON:
            return {
                ...state,
                persons: state.persons.concat({
                    ...action.payload,
                    id: action.payload.name + action.payload.age
                })
            };
        case actionTypes.DELETE_PERSON:
            return {
                ...state,
                persons: state.persons.filter(
                    person => person.id !== action.payload
                )
            };
        default:
            return state;
    }
};

export default reducer;
