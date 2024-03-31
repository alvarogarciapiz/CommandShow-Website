import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home.jsx';
import EntrevistaOnum from './EntrevistaOnum.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/entrevista-onum" element={<EntrevistaOnum />} /> 
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;