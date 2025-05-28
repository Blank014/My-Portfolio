import React from 'react';
import Header from '../sections/Header';
import Home from '../sections/Home';
import About from '../sections/About';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';
import UniWork from '../sections/UniWork';
import Hobbies from '../sections/Hobbies';
import { ThemeProvider } from '../context/ThemeContext';

const MobileLayout = () => {

    return (
        <ThemeProvider>
            <div className="Mobile-App">
                <Header header='position-sticky' />
                <div className="mobile-main-container">
                    <Home />
                    <About />
                    <UniWork />
                    <Projects />
                    <Hobbies />
                    <Contact />
                </div>
            </div>
        </ThemeProvider>

    );
};

export default MobileLayout;




