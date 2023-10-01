import { auth, googleProvider } from "../config/Firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";

export const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async () => {
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    };

    const signInWithGoogle = async () => { 
        await signInWithPopup(auth, googleProvider)
            .then((result) => {
                // // This gives you a Google Access Token. You can use it to access the Google API.
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                // // The signed-in user info.
                // const user = result.user;
                // // ...
            }).catch((error) => {
                // // Handle Errors here.
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // // The email of the user's account used.
                // const email = error.email;
                // // The AuthCredential type that was used.
                // const credential = GoogleAuthProvider.credentialFromError(error);
                // // ...
            });
    };

    const logout = async () => {
        await signOut(auth, googleProvider).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <div>
            <input 
                placeholder="Email" 
                type="email" 
                onChange={(e) => setEmail(e.target.value)}
            />

            <input 
                placeholder="Password" 
                type="password" 
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={signIn}>Sign In</button>

            <button onClick={signInWithGoogle}>Sign In With Google</button>

            <button onClick={logout}>Logout</button>
        </div>
    )
}