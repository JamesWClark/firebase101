import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { NewProblem } from './NewProblem';

import { Home } from './Home'
import { Dash } from './Dash'

const Hourly = () => {
    return <h1>Welcome to the Hourly Page!</h1>;
};

const TenDay = () => {
    return <h1>Welcome to the 10-Day Page!</h1>;
};

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/hourly">Hourly</Link></li>
                        <li><Link to="/10-day">10-Day</Link></li>
                        <li><Link to="/editor">Editor</Link></li>
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

createRoot(document.getElementById('root')).render(<App />);