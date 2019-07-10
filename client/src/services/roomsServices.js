import { apiHost, apiPort } from '../constants'
import { getTokenFromSessionStorage } from "./sessionStorageServices";

export async function getUserRooms() {
    return fetch('http://localhost:3001/api/v4/rooms/', {
        mode: 'cors',
        headers: {
            'Authorization': getTokenFromSessionStorage()
        }
    })
        .then((response) => { return response.json() });
}


export async function getRoom(roomId) {
    return fetch(`http://localhost:3001/api/v4/rooms/${roomId}`, {
        mode: 'cors',
        headers: {
            'Authorization': getTokenFromSessionStorage()
        }
    })
        .then((response) => { return response.json() });
}

export async function addNewRoom(roomAttributes) {
    return fetch(`http://localhost:3001/api/v4/rooms/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': getTokenFromSessionStorage()
        },
        body: JSON.stringify(roomAttributes)
    })
        .then((response) => { return response.json() });
}

export async function deleteRoom(roomId) {
    return fetch(`http://localhost:3001/api/v4/rooms/${roomId}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Authorization': getTokenFromSessionStorage()
        },
    })
        .then((response) => { return response.json() });
}

export async function updateRoom(roomId, roomAttributes) {
    return fetch(`http://localhost:3001/api/v4/rooms/${roomId}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Authorization': getTokenFromSessionStorage()
        },
        body: JSON.stringify(roomAttributes)
    })
        .then((response) => { return response.json() });
}
