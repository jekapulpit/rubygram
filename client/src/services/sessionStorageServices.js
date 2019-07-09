export const setUserSession = (user) => {
    window.sessionStorage.setItem('currentUser', JSON.stringify(user));
};

export const deleteUserSession = () => {
    window.sessionStorage.removeItem('currentUser');
};

export const getCurrentUser = () => {
    return JSON.parse(window.sessionStorage.getItem('currentUser'));
};
