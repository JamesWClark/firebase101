import React, { useState } from 'react';

export const EditableParagraph = ({ description, setDescription }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleHeadingClick = () => {
        setIsEditing(true);
    };

    const handleChange = (event) => {
        setDescription(event.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    const handleFocus = (event) => {
        event.target.select();
    };

    const inputStyle = {
        display: 'inline-block', // Make the input a block element
        fontWeight: 'normal', // Match p font weight
        outline: 'none', // Remove outline
        backgroundColor: 'transparent', // Transparent background
        padding: '0', // Remove padding
        margin: '1em 0', // Add default paragraph margins
        border: 'solid black 1px',
    };

    return isEditing ? (
        <p>
            <input 
                value={description} 
                onChange={handleChange} 
                onBlur={handleBlur}
                onFocus={handleFocus}
                autoFocus
                placeholder='Click to add a description'
                style={inputStyle}
            />
        </p>
    ) : (
        <div>
            <img src="https://img.icons8.com/ios-glyphs/20/000000/pencil.png" alt="Edit" />
            <p className="editable-description" onClick={handleHeadingClick}>
                { description.length === 0 ? 'Click to add a description' : description }
            </p>
        </div>        
    );
};
