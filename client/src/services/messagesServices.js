import { API_HOST, API_PORT, HEADERS } from '../constants'
import { getTokenFromSessionStorage } from "./sessionStorageServices";

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
    console.log(message);
}
