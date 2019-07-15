import { search } from '../actionTypes'

export default (state = { results: [], active: false }, action) => {
    switch (action.type) {
        case search.TOGGLE:
            return {...state, active: !state.active};
        case search.EXECUTE:
            return {...state, results: action.results};
        default:
            return state;
    }
};
