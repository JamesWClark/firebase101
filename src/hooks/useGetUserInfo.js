
export const useGetUserInfo = () => {

    // default values if auth is not set in localStorage
    const { name = '', profilePhoto = '', userID = '', isAuth = false } = JSON.parse(localStorage.getItem("auth")) ?? {};

    return { name, profilePhoto, userID, isAuth };
}