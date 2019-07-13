import { API_HOST, API_PORT, HEADERS } from '../constants'
import { getTokenFromSessionStorage } from "./sessionStorageServices";
import store from '../store'
import {messages} from "../actionTypes";

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
    store.dispatch({type: messages.RECEIVE, message: message})
}
