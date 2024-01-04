import React, { useEffect, useState, useRef } from 'react';
import { useProblem } from '../../hooks/useProblem';
import { CodeMirrorEditor } from './CodeMirrorEditor';
import { EditableHeading } from './EditableHeading';
import { EditableParagraph } from './EditableParagraph';
import { TagEditor } from './TagEditor';

import '../../styles/Main.css';

export const NewProblem = () => {

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

    return (
        <div id="home">
            <EditableHeading heading={title} setHeading={setTitle} />
            <EditableParagraph description={description} setDescription={setDescription} />
            <TagEditor selectedTags={tags} setSelectedTags={setTags} />
            <CodeMirrorEditor />
            <button onClick={onSubmit}>Submit</button>
        </div>
    );
};