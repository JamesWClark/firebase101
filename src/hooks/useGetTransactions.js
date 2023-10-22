import { useState, useEffect } from "react";
import { query, collection, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../config/Firebase';
import { useGetUserInfo } from './useGetUserInfo';

export const useGetTransactions = () => {

    const [transactions, setTransactions] = useState([]);
    const [transactionTotals, setTransactionTotals] = useState({ income: 0, expense: 0, balance: 0 });

    const transactionCollectionRef = collection(db, "transactions");
    const { userID } = useGetUserInfo();

    const getTransactions = async () => {
        let unsubscribe;
        try {
            const queryTransactions = query(
                transactionCollectionRef, 
                where("userID", "==", userID),
                orderBy("createdAt")
            );
            
            // clean up use effect after done
            unsubscribe = onSnapshot(queryTransactions, (querySnapshot) => {
                let data = [];
                let totalIncome = 0;
                let totalExpense = 0;

                querySnapshot.forEach((doc) => {
                    console.log("retrieving doc", doc.data());
                    data.push({ ...doc.data(), id: doc.id });
                    
                    if (doc.data().transactionType === "income") {
                        totalIncome += Number(doc.data().transactionAmount);
                    } else {
                        totalExpense += Number(doc.data().transactionAmount);
                    }
                });
                setTransactions(data);
                setTransactionTotals({ 
                    income: totalIncome, 
                    expense: totalExpense, 
                    balance: totalIncome - totalExpense 
                });
            });
        } catch (error) {
            console.error(error);
        }
        return () => unsubscribe();
    }

    useEffect(() => {
        getTransactions();
    }, []);
    
    return { transactions, transactionTotals };
}