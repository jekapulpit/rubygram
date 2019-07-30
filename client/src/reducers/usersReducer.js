import { users } from '../actionTypes'

export default (state = { currentUser: {} }, action) => {
    switch (action.type) {
        case users.AUTHENTICATE:
            let newCurrentUser = action.currentUser;
            return {...state, currentUser: newCurrentUser, loggedIn: true};
        case users.LOG_OUT:
            return {...state, currentUser: {}, loggedIn: false};
        case users.UPDATE:
            return {...state, currentUser: action.newAttributes};
        case users.CHANGE_UNREAD:
            return {...state, currentUser: {...state.currentUser, unread_number: action.unread_number}};
        default:
            return state;
    }
};
