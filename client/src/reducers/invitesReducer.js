import { invites } from '../actionTypes'

export default (state = { inviteList: [] }, action) => {
    switch (action.type) {
        case invites.SET_LIST:
            return {...state, inviteList: action.invites};
        case invites.RECEIVE:
            return {...state, inviteList: state.inviteList.concat(action.invite)};
        case invites.ACCEPT:
            return {...state, inviteList: state.inviteList.filter((invite) => invite.id !== action.inviteId)};
        case invites.REJECT:
            return {...state, inviteList: state.inviteList.filter((invite) => invite.id !== action.inviteId)};
        case invites.UPDATE:
            return {...state, inviteList: state.inviteList.filter((invite) => action.deletedInvites.indexOf(invite.id) === -1)};
        case invites.CANCEL:
            return {...state, inviteList: state.inviteList.filter((invite) => invite.id !== action.invite.id)};
        default:
            return state;
    }
};
