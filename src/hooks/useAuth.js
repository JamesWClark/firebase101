// Custom hook to retrieve and parse user data from local storage
export const useAuth = () => {
    const { userID, name, profilePhoto, isAuth } = JSON.parse(localStorage.getItem('auth')) || {};
    return { userID, name, profilePhoto, isAuth };
}
