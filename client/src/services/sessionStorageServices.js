export const setUserSession = (data) => {
    window.sessionStorage.setItem('currentUser', JSON.stringify(data.current_user));
    window.sessionStorage.setItem('auth_token', JSON.stringify(data.token));
};

export const updateUserSession = (currentUser) => {
    window.sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
};

export const deleteUserSession = () => {
    window.sessionStorage.removeItem('currentUser');
    window.sessionStorage.removeItem('auth_token');
};

export const getCurrentUser = () => {
    return JSON.parse(window.sessionStorage.getItem('currentUser'));
};

export const getTokenFromSessionStorage = () => {
    let token = window.sessionStorage.getItem('auth_token');
    return token ? `Bearer ${token.split('"').join('')}` : null;
};
