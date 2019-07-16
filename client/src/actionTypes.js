export const users = {
    AUTHENTICATE: 'AUTHENTICATE',
    LOG_OUT: 'LOG_OUT',
};

export const rooms = {
    SET_ROOM_LIST: 'SET_ROOM_LIST',
    SET_CURRENT_ROOM: 'SET_ROOM',
    CREATE: 'CREATE_ROOM',
    DELETE: 'DELETE_ROOM',
    UPDATE: 'UPDATE_ROOM',
};

export const messages = {
    GET_ALL_MESSAGES: 'GET_ALL_MESSAGES',
    SEND: 'SEND_MESSAGE',
    DELETE: 'DELETE_MESSAGE',
    RECEIVE: 'RECEIVE_MESSAGE',
};

export const search = {
    TOGGLE: 'TOGGLE_SEARCH',
    EXECUTE: 'EXECUTE_SEARCH',
    CLEAN: 'CLEAN_SEARCH'
};

export const invites = {
    SET_LIST: 'SET_INVITE_LIST',
    RECEIVE: 'RECEIVE_INVITE',
    ACCEPT: 'ACCEPT_INVITE',
    REJECT: 'REJECT_INVITE',
    READ: 'READ_INVITES'
};
