import { auth, provider } from '../config/firebase';
import { signOut, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

// Custom hook to retrieve and parse user data from local storage
export const useAuth = () => {

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

    const signOutGoogle = async () => {
        await signOut(auth);
        localStorage.removeItem('auth');
        navigate('/');
    }

    const { userID, name, profilePhoto, isAuth } = JSON.parse(localStorage.getItem('auth')) || {};
    
    return { 
        signInGoogle,
        signOutGoogle,
        userID, name, profilePhoto, isAuth 
    };
}
