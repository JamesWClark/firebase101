import React, { useState, useEffect } from 'react';

import '../../styles/TagEditor.css';

export const TagEditor = ({ selectedTags, setSelectedTags }) => {
    // const [tags, setTags] = useState(['arrays', 'lists', 'loops', 'functions', 'selection', 'recursion', 'strings', 'dictionaries', 'classes', 'objects', 'files', 'exceptions', 'testing', 'algorithms', 'data structures', 'sorting', 'searching', 'graphs', 'trees', 'hashing', 'big O notation', 'asymptotic analysis', 'dynamic programming', 'greedy algorithms', 'divide and conquer', 'backtracking', 'bit manipulation', 'recursion', 'math', 'bitwise operators', 'bitwise shifts', 'bitwise masks', 'bitwise operations', 'bitwise arithmetic', 'bitwise addition', 'bitwise subtraction', 'bitwise multiplication', 'bitwise division', 'bitwise modulus', 'bitwise negation', 'bitwise complement', 'bitwise AND', 'bitwise OR', 'bitwise XOR', 'bitwise NOT', 'bitwise NAND', 'bitwise NOR', 'bitwise XNOR', 'bitwise rotation', 'bitwise swap', 'bitwise reverse', 'bitwise parity', 'bitwise hamming weight', 'bitwise hamming distance', 'bitwise population count', 'bitwise population parity', 'bitwise population hamming weight', 'bitwise population hamming distance', 'bitwise population parity']);
    
    const tags = ['arrays', 'lists', 'loops', 'functions', 'selection', 'recursion', 'strings', 'dictionaries', 'classes', 'objects', 'math'];
    
    const [inputValue, setInputValue] = useState('');
    const [matchedTags, setMatchedTags] = useState([]);

    // This effect runs whenever inputValue or selectedTags changes.
    // It sets the matchedTags state to an array of tags that include the inputValue and are not already selected.
    useEffect(() => {
        setMatchedTags(
            tags.filter(
                tag => tag.includes(inputValue) && !selectedTags.includes(tag)
            )
        );
    }, [inputValue, selectedTags]);

    // This function handles changes to the input field.
    // It sets the inputValue state to the current value of the input field.
    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        if (matchedTags.includes(value)) {
            setSelectedTags(prevTags => [...prevTags, value]);
            setInputValue('');
        }
    };

    const handleTagRemove = (tagToRemove) => {
        setSelectedTags(prevTags => prevTags.filter(tag => tag !== tagToRemove));
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Tab' && matchedTags.includes(inputValue)) {
            // Prevent the browser from handling the Tab key press
            event.preventDefault();
    
            // Add the inputValue to the selectedTags
            setSelectedTags(prevTags => [...prevTags, inputValue]);
    
            // Clear the inputValue
            setInputValue('');
        }
    };

    return (
        <div id="tag-editor-container">
            {selectedTags.map(tag => (
                <span className="tag-item" key={tag}>
                    <span className="pointer" onClick={() => handleTagRemove(tag)}>✖</span>
                    {tag}
                </span>
            ))}
            <input list="tag-list" type="text" value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} />
            <datalist id="tag-list">
                {matchedTags.map(tag => (
                    <option key={tag} value={tag} />
                ))}
            </datalist>
        </div>
    );
};

export default TagEditor;
