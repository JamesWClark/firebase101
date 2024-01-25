/// TODO : Look into HackerRank SaaS for code editor

import React, { useEffect, useState, useRef } from 'react';
import { basicSetup } from 'codemirror';
import { EditorState, StateField } from '@codemirror/state';
import { EditorView, keymap, placeholder } from '@codemirror/view';
import { defaultKeymap, indentMore, indentLess } from '@codemirror/commands';
import { autocompletion, startCompletion } from '@codemirror/autocomplete';
import { javascript, scopeCompletionSource, javascriptLanguage } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { debounce } from 'lodash';


import '../../styles/CodeMirrorEditor.css';

export const CodeMirrorEditor = ({ initialCode }) => {
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState('');
    const editorRef = useRef();

    // Debounce save to localStorage one second after the user stops typing
    const saveToLocalStorage = debounce((code) => {
        localStorage.setItem('code', code);
        setIsSaving(false);
    }, 1000); // delay in ms

    // Log changes to the editor
    const logChangeField = StateField.define({
        create: () => null,
        update(value, tr) {
            if (tr.docChanged) {
                const code = tr.state.doc.toString()
                saveToLocalStorage(code);
                setIsSaving(true);
                console.log(code);
            }
            return value;
        }
    });

    // Add window completions to intellisense
    const windowCompletions = javascriptLanguage.data.of({
        autocomplete: scopeCompletionSource(window)
    });

    // Update editor save status
    useEffect(() => {
        if (isSaving) {
            setSaveStatus('Saving...');
        } else if (localStorage.getItem('code') && localStorage.getItem('code').length > 0) {
            setSaveStatus('Saved');
        } else {
            setSaveStatus('');
        }
    }, [isSaving]);

    // Create the editor
    useEffect(() => {
        if (!editorRef.current) return;

        // Editor config
        const startState = EditorState.create({
            doc: '',
            extensions: [
                basicSetup,
                keymap.of([
                    ...defaultKeymap,
                    { key: "Tab", run: indentMore },
                    { key: "Shift-Tab", run: indentLess },
                    { key: "Ctrl-Space", run: startCompletion },
                ]),
                oneDark,
                logChangeField,
                windowCompletions,
                javascript(),
                autocompletion(),
                placeholder('Type your code here...'),
            ],
        });

        // Create the editor
        const view = new EditorView({
            state: startState,
            parent: editorRef.current,
        });

        // Check if there is any code saved in localStorage
        const savedCode = localStorage.getItem('code');
        console.log('saved code, ', savedCode);
        if (initialCode) {
            view.dispatch({
                changes: { from: 0, to: view.state.doc.length, insert: initialCode },
            });
        }
        else if (savedCode) {
            // Replace the current content with the saved code
            view.dispatch({
                changes: { from: 0, to: view.state.doc.length, insert: savedCode },
            });
        }

        view.focus();

        return () => {
            view.destroy();
        };
    }, [initialCode]);

    return (
        <div>
            <div ref={editorRef} className='cm-container' />
            {saveStatus}
        </div>
    );
};
