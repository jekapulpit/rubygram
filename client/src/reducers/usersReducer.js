import { users } from '../actionTypes'

export default (state = { currentUser: {} }, action) => {
    switch (action.type) {
        case users.AUTHENTICATE:
            let newCurrentUser = action.currentUser;
            return {...state, currentUser: newCurrentUser, loggedIn: true};
        case users.LOG_OUT:
            return {...state, currentUser: {}, loggedIn: false};
        default:
            return state;
    }
};
