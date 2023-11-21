import React from 'react';

import { useNavigate } from 'react-router-dom';
import { auth, provider } from './config/firebase';
import { signInWithPopup } from 'firebase/auth';

export const Home = () => {

    const navigate = useNavigate();

    const signInGoogle = async () => {
        const results = await signInWithPopup(auth, provider);
        const authInfo = {
            userID: results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true,
        }
        localStorage.setItem('auth', JSON.stringify(authInfo));
        navigate('/dash')
        console.log(results);
    }
    
    return (
        <div>
            <button onClick={signInGoogle}>Sign in With Google</button>
        </div>
    );
};
