import { API_HOST, API_PORT } from '../constants'
import { getTokenFromSessionStorage } from "./sessionStorageServices";

export async function updateUser(userId, userAttributes) {
    return fetch(`http://${API_HOST}:${API_PORT}/api/v4/users/${userId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Authorization': getTokenFromSessionStorage(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userAttributes)
    })
        .then((response) => { return response.json() });
}

export async function getUser(userId) {
    return fetch(`http://${API_HOST}:${API_PORT}/api/v4/users/${userId}`, {
        mode: 'cors',
        headers: {
            'Authorization': getTokenFromSessionStorage(),
            'Content-Type': 'application/json',
        },
    })
        .then((response) => { return response.json() });
}
