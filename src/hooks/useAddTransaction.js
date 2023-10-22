/* every hook has to start with "use" */

import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { db } from '../config/Firebase';
import { useGetUserInfo } from './useGetUserInfo';

export const useAddTransaction = () => {

    const { userID } = useGetUserInfo();

    console.log('useAddTransaction userID: ', userID);

    // stuck: 1:03:30

    const addTransaction = async ( { description, transactionAmount, transactionType } ) => {
        
        await addDoc(collection(db, "transactions"), {
            userID,
            description,
            transactionAmount,
            transactionType,
            createdAt: serverTimestamp(),
        });
    }

    return { addTransaction };
    
    // const onSubmit = (e) => {
    //     e.preventDefault();
    
    //     const newTransaction = {
    //     id: Math.floor(Math.random() * 100000000), // random id
    //     text,
    //     amount: +amount,
    //     };
    
    //     addTransaction(newTransaction);
    // };
    
    // return { text, setText, amount, setAmount, onSubmit };
}