import React, { useState, useEffect } from 'react';

export const TagEditor = ({ selectedTags, setSelectedTags }) => {
    // const [tags, setTags] = useState(['arrays', 'lists', 'loops', 'functions', 'selection', 'recursion', 'strings', 'dictionaries', 'classes', 'objects', 'files', 'exceptions', 'testing', 'algorithms', 'data structures', 'sorting', 'searching', 'graphs', 'trees', 'hashing', 'big O notation', 'asymptotic analysis', 'dynamic programming', 'greedy algorithms', 'divide and conquer', 'backtracking', 'bit manipulation', 'recursion', 'math', 'bitwise operators', 'bitwise shifts', 'bitwise masks', 'bitwise operations', 'bitwise arithmetic', 'bitwise addition', 'bitwise subtraction', 'bitwise multiplication', 'bitwise division', 'bitwise modulus', 'bitwise negation', 'bitwise complement', 'bitwise AND', 'bitwise OR', 'bitwise XOR', 'bitwise NOT', 'bitwise NAND', 'bitwise NOR', 'bitwise XNOR', 'bitwise rotation', 'bitwise swap', 'bitwise reverse', 'bitwise parity', 'bitwise hamming weight', 'bitwise hamming distance', 'bitwise population count', 'bitwise population parity', 'bitwise population hamming weight', 'bitwise population hamming distance', 'bitwise population parity']);
    
    const tags = ['arrays', 'lists', 'loops', 'functions', 'selection', 'recursion', 'strings', 'dictionaries', 'classes', 'objects', 'math'];
    
    const [inputValue, setInputValue] = useState('');
    const [matchedTags, setMatchedTags] = useState([]);

    useEffect(() => {
        setMatchedTags(
            tags.filter(
                tag => tag.includes(inputValue) && !selectedTags.includes(tag)
            )
        );
    }, [inputValue, selectedTags]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleTagClick = (tag) => {
        setSelectedTags([...selectedTags, tag]);
        setInputValue('');
        setMatchedTags([]);
    };

    return (
        <div id="tag-editor-container">
            {selectedTags.map(tag => (
                <span key={tag}>{tag}</span>
            ))}
            <input type="text" value={inputValue} onChange={handleInputChange} />
            {matchedTags.map(tag => (
                <div key={tag} onClick={() => handleTagClick(tag)}>
                    {tag}
                </div>
            ))}
        </div>
    );
};

export default TagEditor;


// import React, { useEffect, useState, useRef } from 'react';

// export const TagEditor = () => {

//     const [tags, setTags] = useState(['arrays', 'lists', 'loops', 'functions', 'selection', 'recursion', 'strings', 'dictionaries', 'classes', 'objects', 'files', 'exceptions', 'testing', 'algorithms', 'data structures', 'sorting', 'searching', 'graphs', 'trees', 'hashing', 'big O notation', 'asymptotic analysis', 'dynamic programming', 'greedy algorithms', 'divide and conquer', 'backtracking', 'bit manipulation', 'recursion', 'math', 'bitwise operators', 'bitwise shifts', 'bitwise masks', 'bitwise operations', 'bitwise arithmetic', 'bitwise addition', 'bitwise subtraction', 'bitwise multiplication', 'bitwise division', 'bitwise modulus', 'bitwise negation', 'bitwise complement', 'bitwise AND', 'bitwise OR', 'bitwise XOR', 'bitwise NOT', 'bitwise NAND', 'bitwise NOR', 'bitwise XNOR', 'bitwise rotation', 'bitwise swap', 'bitwise reverse', 'bitwise parity', 'bitwise hamming weight', 'bitwise hamming distance', 'bitwise population count', 'bitwise population parity', 'bitwise population hamming weight', 'bitwise population hamming distance', 'bitwise population parity']);

    
//     return (
//         <div>
//             <h2>Tags</h2>
//             <p>Enter up to five tags related to this problem.</p>
//             <div id="tag-editor-container">
                
//             </div>
//         </div>
//     );
// };
