export const users = {
    AUTHENTICATE: 'AUTHENTICATE',
    LOG_OUT: 'LOG_OUT',
    UPDATE: 'USER_UPDATE',
    CHANGE_UNREAD: 'USER_CHANGE_UNREAD'
};

export const rooms = {
    SET_ROOM_LIST: 'SET_ROOM_LIST',
    SET_CURRENT_ROOM: 'SET_ROOM',
    UPDATE_SLOTS: 'UPDATE_SLOTS',
    CREATE: 'CREATE_ROOM',
    DELETE: 'DELETE_ROOM',
    UPDATE: 'UPDATE_ROOM',
    SHOW_USERS: 'SHOW_USERS',
    ADD_USER: 'ADD_USER',
    DELETE_USER: 'DELETE_USER',
    CONNECT: 'CONNECT_ROOM',
    DISCONNECT: 'DISCONNECT_ROOM',
    UNSUBSCRIBE: 'UNSUBSCRIBE',
    ANSWER: 'ANSWER'
};

export const messages = {
    GET_ALL_MESSAGES: 'GET_ALL_MESSAGES',
    SEND: 'SEND_MESSAGE',
    DELETE: 'DELETE_MESSAGE',
    RECEIVE: 'RECEIVE_MESSAGE',
};

export const search = {
    TOGGLE: 'TOGGLE_USER_SEARCH',
    EXECUTE: 'EXECUTE_USER_SEARCH',
    CLEAN: 'CLEAN_USER_SEARCH',
    SEND: 'SEND_INVITE',
    UPDATE_ROOM_RESULTS: 'UPDATE_ROOM_RESULTS',
    UPDATE_USER_RESULTS: 'UPDATE_USER_RESULTS',
    TOGGLE_MESSAGES: 'TOGGLE_MESSAGES_SEARCH',
    DELETE_MESSAGE: 'DELETE_MESSAGE_RESULT',
    EXECUTE_MESSAGES: 'EXECUTE_MESSAGES_SEARCH',
    CLEAN_MESSAGES: 'CLEAN_MESSAGES_SEARCH',
    EXECUTE_ROOMS: 'EXECUTE_ROOMS_SEARCH',
    CLEAN_ROOMS: 'CLEAN_ROOMS_SEARCH',
    CANCEL: 'CANCEL_INVITE_RESULT',
};

export const invites = {
    SET_LIST: 'SET_INVITE_LIST',
    RECEIVE: 'RECEIVE_INVITE',
    ACCEPT: 'ACCEPT_INVITE',
    CANCEL: 'CANCEL_INVITE',
    REJECT: 'REJECT_INVITE',
    UPDATE: 'UPDATE_INVITE_LIST',
};
