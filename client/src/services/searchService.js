import {API_HOST, API_PORT} from "../constants";
import {getTokenFromSessionStorage} from "./sessionStorageServices";

export const searchUsers = (request, room) => fetch(`http://${API_HOST}:${API_PORT}/api/v4/search/users/?request=${request}&room_id=${room}`, {
        mode: 'cors',
        headers: {
            'Authorization': getTokenFromSessionStorage()
        }
    })
    .then((response) => { return response.json() });

export const searchUsersGlobal = (request) => fetch(`http://${API_HOST}:${API_PORT}/api/v4/search/users/?request=${request}`, {
    mode: 'cors',
    headers: {
        'Authorization': getTokenFromSessionStorage()
    }
})
    .then((response) => { return response.json() });

export const searchMessages = (request, room) => fetch(`http://${API_HOST}:${API_PORT}/api/v4/search${room}/messages?request=${request}`, {
    mode: 'cors',
    headers: {
        'Authorization': getTokenFromSessionStorage()
    }
})
    .then((response) => { return response.json() });

export const searchRooms = (request) => fetch(`http://${API_HOST}:${API_PORT}/api/v4/search/rooms?request=${request}`, {
    mode: 'cors',
    headers: {
        'Authorization': getTokenFromSessionStorage()
    }
})
    .then((response) => { return response.json() });
