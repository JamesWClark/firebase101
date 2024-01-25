import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "./config/firebase";
import { useAuth } from './hooks/useAuth';

import './styles/Dash.css';

export const Dash = () => {

  const { userID } = useAuth();
  const [problems, setProblems] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "problems"), where("userID", "==", userID));
      const querySnapshot = await getDocs(q);
      const docsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProblems(docsData);
    };

    if (userID) {
      fetchData();
    }
  }, [userID]);

  return (
    <div id="dash">
      <h1>Dashboard</h1>
      <div className="break">
        <Link to="/editor" className="new-problem-button">+ New Problem</Link>
        {localStorage.getItem('code') && 
          <Link to="/editor" className="continue-button">Continue Working</Link>
        }
      </div>
      {problems && problems.length > 0 && <hr />}
      <div className="flex">
        {problems && problems.map((problem, index) => (
          <div className="problem-list-item" key={index}>
            <Link className="problem-list-item-link" to={`/editor?id=${problem.id}`}>{problem.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};


/*

rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}

*/