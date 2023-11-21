import React, { useState } from 'react';

export const EditableHeading = ({ heading, setHeading }) => {
    
    const [isEditing, setIsEditing] = useState(false);

    const handleHeadingClick = () => {
        setIsEditing(true);
    };

    const handleChange = (event) => {
        setHeading(event.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    const handleFocus = (event) => {
        event.target.select();
    };

    const inputStyle = {
        display: 'inline-block', // Make the input a block element
        fontSize: '1em', // Match h1 font size
        fontWeight: 'bold', // Match h1 font weight
        outline: 'none', // Remove outline
        backgroundColor: 'transparent', // Transparent background
        border: 'solid black 1px',
    };

    return isEditing ? (
        <h1>
            <input 
                value={heading} 
                onChange={handleChange} 
                onBlur={handleBlur}
                onFocus={handleFocus}
                autoFocus
                style={inputStyle}
            />
        </h1>
    ) : (
        <h1 onClick={handleHeadingClick}>{heading}</h1>
    );
};