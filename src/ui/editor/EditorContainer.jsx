import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useProblem } from '../../hooks/useProblem';
import { CodeMirrorEditor } from './CodeMirrorEditor';
import { EditableHeading } from './EditableHeading';
import { EditableParagraph } from './EditableParagraph';
import { TagEditor } from './TagEditor';

import { db } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import { doc, getDoc } from 'firebase/firestore';

import '../../styles/Main.css';
import { set } from 'lodash';

export const EditorContainer = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [documentID, setDocumentID] = useState(queryParams.get('id') || '');

    const { userID } = useAuth();
    const [docData, setDocData] = useState('');

    const { addProblem } = useProblem(); // saves to firebase
    const [title, setTitle] = useState('Untitled Problem');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);

    // Submit button was clicked
    const onSubmit = async () => {
        const code = localStorage.getItem('code');
        const problem = {
            code,
            title,
            description,
            tags,
        }
        const results = await addProblem(problem);
        console.log(results);
    }

    // Prevents default save with ctrl-s or cmd-s
    useEffect(() => {
        const handler = (event) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
                event.preventDefault();
                console.log('default save prevented');
            }
        };

        window.addEventListener('keydown', handler);

        return () => {
            window.removeEventListener('keydown', handler);
        };
    }, []);

    // Load code from firebase
    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, 'problems', documentID);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setTitle(docSnap.data().title);
                setDescription(docSnap.data().description);
                setTags(docSnap.data().tags);
                setDocData(docSnap.data().code);
            } else {
                console.log('No such document!');
            }
        };

        if (userID && documentID) {
            fetchData();
        }
    }, [userID, documentID]);

    return (
        <div id="home">
            <EditableHeading heading={title} setHeading={setTitle} />
            <EditableParagraph description={description} setDescription={setDescription} />
            <TagEditor selectedTags={tags} setSelectedTags={setTags} />
            <CodeMirrorEditor initialCode={docData} />
            <button onClick={onSubmit}>Submit</button>
        </div>
    );
};