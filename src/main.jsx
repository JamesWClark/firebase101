import React from 'react';
import { createRoot } from 'react-dom/client';

import { Navbar } from './ui/nav/Navbar';

import './styles/Main.css';

const App = () => {
    return (
        <Navbar />
    );
};

createRoot(document.getElementById('root')).render(<App />);
