import { useEffect, useState } from "react";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "../../config/Firebase"; 
import { signInWithPopup } from "firebase/auth";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useNavigate, Navigate } from "react-router-dom";


export const Auth = () => {

    const navigate = useNavigate();
    const { isAuth } = useGetUserInfo();

    const onSignInWithGoogle = async () => {
        const results = await signInWithPopup(auth, googleProvider)
        console.log('google user signin');
        console.log(results)

        const authInfo = {
            userID: results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true,
        }
        localStorage.setItem("auth", JSON.stringify(authInfo))
        navigate('/expense-tracker')
    };

    if(isAuth) {
        return (<Navigate to="/expense-tracker" />)
    }   

    return (
        <div className="login-page">
            <p>Sign in With Google to Continue</p>
            <button onClick={onSignInWithGoogle} className="login-with-google-btn">Sign In WIth Google</button>
        </div>
    )
}