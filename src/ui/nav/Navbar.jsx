import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { NewProblem } from '../editor/NewProblem';
import { Profile } from './Profile';

import { Home } from '../../Home'
import { Dash } from '../../Dash'

import '../../styles/Navbar.css';

const Hourly = () => {
    return <h1>Welcome to the Hourly Page!</h1>;
};

const TenDay = () => {
    return <h1>Welcome to the 10-Day Page!</h1>;
};


export const Navbar = () => {

    return (
        <Router>
            <div>
                <nav>
                    <ul className="flex">
                        <li className="x1 center"><Link className="nav-item flex middle center" to="/">Home</Link></li>
                        <li className="x1 center"><Link className="nav-item flex middle center" to="/hourly">Hourly</Link></li>
                        <li className="x1 center"><Link className="nav-item flex middle center" to="/10-day">10-Day</Link></li>
                        <li className="x1 center"><Link className="nav-item flex middle center" to="/editor">Editor</Link></li>
                        <li className="x1 center"><Link className="nav-item flex middle center" to="/dash">Dash</Link></li>
                        <li className="x1 center"><Profile /></li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/hourly" element={<Hourly />} />
                    <Route path="/10-day" element={<TenDay />} />
                    <Route path="/dash" element={<Dash />} />
                    <Route path="/editor" element={<NewProblem />} />
                </Routes>
            </div>
        </Router>
    );
};