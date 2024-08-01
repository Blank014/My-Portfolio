// src/App.js
import React from 'react';
import Header from './components/Header';
import Home from './sections/Home';
import About from './sections/About';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import './App.css';

function App() {
    return (
        <div className="App">
            <Header />
            <Home />
            <About />
            <Projects />
            <Contact />
        </div>
    );
}

export default App;
