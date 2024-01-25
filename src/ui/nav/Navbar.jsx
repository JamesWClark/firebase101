import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { EditorContainer } from '../editor/EditorContainer';
import { Profile } from './Profile';
import { Home } from '../../Home'
import { Dash } from '../../Dash'

import '../../styles/Navbar.css';

export const Navbar = () => {

    return (
        <Router>
            <div>
                <nav>
                    <ul className="flex">
                        <li className="x1 center"><Link className="nav-item flex middle center" to="/">Home</Link></li>
                        <li className="x1 center"><Link className="nav-item flex middle center" to="/editor">Editor</Link></li>
                        <li className="x1 center"><Link className="nav-item flex middle center" to="/dash">Dash</Link></li>
                        <li className="x1 center"><Profile /></li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dash" element={<Dash />} />
                    <Route path="/editor" element={<EditorContainer />} />
                </Routes>
            </div>
        </Router>
    );
};