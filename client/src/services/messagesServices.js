import { API_HOST, API_PORT } from '../constants'
import { getTokenFromSessionStorage } from "./sessionStorageServices";
import store from '../store'
import basicScroll from "./scrollingService";
import {readAllMessages} from "./roomsServices";

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
    if(window.location.pathname === ('/home/rooms/' + action.message.recipient_id))
        readAllMessages(action.message.recipient_id);
    store.dispatch(action);
    basicScroll();
}
