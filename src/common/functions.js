export const setAuthToken = (token) => {
    localStorage.setItem('token', token);
}

export const getAuthToken = () => {
    return localStorage.getItem('token');
}

export const removeAuthToken = () => {
    localStorage.removeItem('token');
}
export const setUserId = (userId) => {
    localStorage.setItem('userId', userId);
}
export const getUserId = () => {
    return localStorage.getItem('userId');
}
export const removeUserId = () => {
    localStorage.removeItem('userId');
}
