import { setUserSession, deleteUserSession } from './sessionStorageServices'
import { setCookie, deleteCookie } from './cookieServices'

export function authentificateUser(userCredintials) {
    let url = 'http://localhost:3001/api/v4/auth';
    let requestOpts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userCredintials)
    };
    fetch(url, requestOpts)
        .then((response) => {return response.json()})
        .then((data) => {
            if(data.token) {
                setUserSession(data);
                setCookie('auth_token', data.token);
            }
            else {
                console.log('nope')
            }
        })
}

export function logout() {
    deleteUserSession();
    deleteCookie('auth_token');
}
