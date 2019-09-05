import { API_HOST, API_PORT } from '../constants'
import {getCurrentUser, getTokenFromSessionStorage} from "./sessionStorageServices";
import store from '../store'
import basicScroll from "./scrollingService";
import {readAllMessages} from "./roomsServices";
import {messages, rooms, search} from "../actionTypes";

export async function sendMessage(messageAttributes) {
    return fetch(`http://${API_HOST}:${API_PORT}/api/v4/messages/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getTokenFromSessionStorage()
        },
        body: JSON.stringify(messageAttributes)
    })
        .then((response) => { return response.json() });
}

export async function deleteMessage(messageId) {
    return fetch(`http://${API_HOST}:${API_PORT}/api/v4/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getTokenFromSessionStorage()
        },
    })
        .then((response) => { return response.json() });
}

export function receiveMessage(action) {
    store.dispatch(action);
    switch (action.type) {
        case rooms.UNSUBSCRIBE:
            if(action.user_id === getCurrentUser().id)
                window.location = '/home/rooms';
            break;
        case rooms.SUBSCRIBE:
            store.dispatch({type: search.UPDATE_USER_RESULTS, result: action.user});
            break;
        case messages.RECEIVE:
            if(window.location.pathname === ('/home/rooms/' + action.message.recipient_id))
                readAllMessages(action.message.recipient_id);
            basicScroll();
            break;
    }
}
