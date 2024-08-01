import React from 'react';
import Header from './sections/Header';
import Home from './sections/Home';
import About from './sections/About';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-container">
        <div className="left-column">
          <Home />
        </div>
        <div className="right-column">
          <About />
          <Projects />
          <Contact />
        </div>
      </div>
    </div>
  );
}

export default App;
