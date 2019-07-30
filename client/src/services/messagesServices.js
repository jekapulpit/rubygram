import { API_HOST, API_PORT } from '../constants'
import { getTokenFromSessionStorage } from "./sessionStorageServices";
import store from '../store'
import {messages} from "../actionTypes";
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

export function receiveMessage(message) {
    if(window.location.pathname === ('/home/rooms/' + message.recipient_id))
        readAllMessages(message.recipient_id);
    store.dispatch({type: messages.RECEIVE, message: message});
    basicScroll();
}
