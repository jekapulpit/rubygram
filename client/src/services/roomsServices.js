import { API_HOST, API_PORT, HEADERS } from '../constants'
import { getTokenFromSessionStorage } from "./sessionStorageServices";

export async function getUserRooms() {
    return fetch(`http://${API_HOST}:${API_PORT}/api/v4/rooms/`, {
        mode: 'cors',
        headers: {
            'Authorization': getTokenFromSessionStorage()
        }
    })
        .then((response) => { return response.json() });
}


export async function getRoom(roomId) {
    return fetch(`http://${API_HOST}:${API_PORT}/api/v4/rooms/${roomId}`, {
        mode: 'cors',
        headers: {
            'Authorization': getTokenFromSessionStorage()
        }
    })
        .then((response) => { return response.json() });
}

export async function addNewRoom(roomAttributes) {
    return fetch(`http://${API_HOST}:${API_PORT}/api/v4/rooms/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getTokenFromSessionStorage()
        },
        body: JSON.stringify(roomAttributes)
    })
        .then((response) => { return response.json() });
}

export async function deleteRoom(roomId) {
    return fetch(`http://${API_HOST}:${API_PORT}/api/v4/rooms/${roomId}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Authorization': getTokenFromSessionStorage()
        },
    })
        .then((response) => { return response.json() });
}

export async function updateRoom(roomId, roomAttributes) {
    return fetch(`http://${API_HOST}:${API_PORT}/api/v4/rooms/${roomId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Authorization': getTokenFromSessionStorage(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomAttributes)
    })
        .then((response) => { return response.json() });
}
