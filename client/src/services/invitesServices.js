import { API_HOST, API_PORT } from '../constants'
import { getTokenFromSessionStorage } from "./sessionStorageServices";
import store from "../store";
import {invites} from "../actionTypes";

export async function sendInvite(userId, roomId, content) {
    return fetch(`http://${API_HOST}:${API_PORT}/api/v4/invites/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getTokenFromSessionStorage()
        },
        body: JSON.stringify({
            invite: {
                content: content,
                user_id: userId,
                room_id: roomId
            }
        })
    })
        .then((response) => { return response.json() });
}

export async function getUserInvites() {
    return fetch(`http://${API_HOST}:${API_PORT}/api/v4/invites/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getTokenFromSessionStorage()
        },
    })
        .then((response) => { return response.json() });
}

export async function acceptInvite(inviteId) {
    return fetch(`http://${API_HOST}:${API_PORT}/api/v4/invites/accept/${inviteId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getTokenFromSessionStorage()
        },
    })
        .then((response) => { return response.json() });
}

export async function rejectInvite(inviteId) {
    return fetch(`http://${API_HOST}:${API_PORT}/api/v4/invites/reject/${inviteId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getTokenFromSessionStorage()
        },
    })
        .then((response) => { return response.json() });
}

export async function receiveInvite(invite) {
    store.dispatch({type: invites.RECEIVE, invite: invite});
}
