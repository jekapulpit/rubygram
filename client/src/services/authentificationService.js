import {
  setUserSession, deleteUserSession, updateUserSession, getCurrentUser, getTokenFromSessionStorage,
} from './sessionStorageServices';
import { setCookie, deleteCookie } from './cookieServices';
import store from '../store';
import { users } from '../actionTypes';
import { API_HOST, API_PORT } from '../constants';

export function authentificateUser(userCredentials) {
  const url = 'http://localhost:3001/api/v4/auth';
  const requestOpts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userCredentials),
  };
  fetch(url, requestOpts)
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        setUserSession(data);
        setCookie('auth_token', data.token);
        store.dispatch({ type: users.AUTHENTICATE, currentUser: getCurrentUser() });
        window.location = '/home';
      } else {
        console.log('nope');
      }
    });
}

export function registerUser(userCredentials) {
  const url = 'http://localhost:3001/api/v4/register/';
  const requestOpts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userCredentials),
  };
  fetch(url, requestOpts)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) window.location = '/login';
    });
}

export function logout() {
  deleteUserSession();
  deleteCookie('auth_token');
  store.dispatch({ type: users.LOG_OUT });
  window.location = '/login';
}

export function syncCurrentUser() {
  const url = `http://${API_HOST}:${API_PORT}/api/v4/auth/sync`;
  const requestOpts = {
    method: 'GET',
    headers: {
      Authorization: getTokenFromSessionStorage(),
    },
  };
  fetch(url, requestOpts)
    .then((response) => response.json())
    .then((data) => {
      if (data.current_user && data.status !== 500 && data.status !== 401) {
        updateUserSession(data.current_user);
        store.dispatch({ type: users.UPDATE, newAttributes: data.current_user });
      } else {
        deleteUserSession();
        window.location = '/login';
      }
    });
  return getCurrentUser();
}
