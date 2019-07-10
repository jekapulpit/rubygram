export const setUserSession = (data) => {
    window.sessionStorage.setItem('currentUser', JSON.stringify(data.current_user));
    window.sessionStorage.setItem('auth_token', JSON.stringify(data.token));
};

export const deleteUserSession = () => {
    window.sessionStorage.removeItem('currentUser');
};

export const getCurrentUser = () => {
    return JSON.parse(window.sessionStorage.getItem('currentUser'));
};
