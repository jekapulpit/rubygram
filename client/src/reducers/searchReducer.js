import { search } from '../actionTypes'

export default (state = { results: [], active: false }, action) => {
    switch (action.type) {
        case search.TOGGLE:
            return {...state, active: !state.active};
        case search.EXECUTE:
            return {...state, results: action.results};
        case search.SEND:
            let newResults = state.results.map((result) => {
                if(result.id === action.userId)
                    return {...result, invite_status: 'sent'};
                return result;
            });
            return {...state, results: newResults};
        case search.CLEAN:
            return {...state, results: []};
        case search.TOGGLE_MESSAGES:
            return {...state, messageSearch: !state.messageSearch};
        case search.EXECUTE_MESSAGES:
            return {...state, messageResults: action.results};
        case search.CLEAN_MESSAGES:
            return {...state, messageResults: []};
        default:
            return state;
    }
};
