import { API_HOST, API_PORT } from '../constants';
import { getTokenFromSessionStorage } from './sessionStorageServices';

export async function updateUser(userId, userAttributes) {
  return fetch(`http://${API_HOST}:${API_PORT}/api/v4/users/${userId}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      Authorization: getTokenFromSessionStorage(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userAttributes),
  })
    .then((response) => response.json());
}

export async function getUser(userId) {
  return fetch(`http://${API_HOST}:${API_PORT}/api/v4/users/${userId}`, {
    mode: 'cors',
    headers: {
      Authorization: getTokenFromSessionStorage(),
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json());
}

export async function changeUserSettings(userId, newValue) {
  return fetch(`http://${API_HOST}:${API_PORT}/api/v4/users/${userId}/settings`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      Authorization: getTokenFromSessionStorage(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ new_value: newValue }),
  })
    .then((response) => response.json());
}

export async function changeDefaultUserSettings(newValue) {
  return fetch(`http://${API_HOST}:${API_PORT}/api/v4/settings/users`, {
    mode: 'cors',
    method: 'PUT',
    headers: {
      Authorization: getTokenFromSessionStorage(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ new_value: newValue }),
  })
    .then((response) => response.json());
}

export async function givePriveleges(userId) {
  return fetch(`http://${API_HOST}:${API_PORT}/api/v4/settings/users/admin/${userId}`, {
    mode: 'cors',
    method: 'PUT',
    headers: {
      Authorization: getTokenFromSessionStorage(),
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json());
}

export async function ignoreUserByRoom(roomId) {
  return fetch(`http://${API_HOST}:${API_PORT}/api/v4/users/${roomId}/ignore_by_room/`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      Authorization: getTokenFromSessionStorage(),
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json());
}

export async function ignoreUser(userId) {
  return fetch(`http://${API_HOST}:${API_PORT}/api/v4/users/${userId}/ignore/`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      Authorization: getTokenFromSessionStorage(),
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json());
}

export async function stopIgnoreUser(userId) {
  return fetch(`http://${API_HOST}:${API_PORT}/api/v4/users/${userId}/stop_ignore/`, {
    mode: 'cors',
    method: 'DELETE',
    headers: {
      Authorization: getTokenFromSessionStorage(),
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json());
}
