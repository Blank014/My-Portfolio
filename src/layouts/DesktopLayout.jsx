import React from 'react';
import Header from '../sections/Header';
import Home from '../sections/Home';
import About from '../sections/About';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';
import UniWork from '../sections/UniWork';
import Hobbies from '../sections/Hobbies';
import { ThemeProvider } from '../context/ThemeContext';

const DesktopLayout = () => {

    return (
        <ThemeProvider>
            <div className="App">
                <Header header='position-fixed' />
                <div className="main-container">
                    <div className="left-column">
                        <Home />
                    </div>
                    <div className="right-column">
                        <About />
                        <UniWork />
                        <Projects />
                        <Hobbies />
                        <Contact />
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default DesktopLayout;
