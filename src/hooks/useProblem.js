import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from './useAuth';

export const useProblem = () => {

    const problemCollectionRef = collection(db, "problems");
    const { userID } = useAuth();
    const addProblem = async ({
        title = "",
        code = "",
        description = "", // optional
        difficulty = "",
        tags = []
    }) => {
        console.log("attempting a save for userid: ", userID);
        const docRef = await addDoc(problemCollectionRef, {
            userID,
            title,
            code,
            description: description || "", // optional
            difficulty,
            tags,
            createdAt: serverTimestamp(),
        });
        console.log("Document written with ID: ", docRef.id);
    };

    return { addProblem };
};
