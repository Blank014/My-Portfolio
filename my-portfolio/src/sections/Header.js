import React, { useState } from 'react';
import '../styles/Header.css';
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { toggleLanguage } = useLanguage();
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="header">
            <nav>
                <div className="burger-menu" onClick={toggleMenu}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
                <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                    <li><a href="#home" onClick={() => setIsOpen(false)}>Home</a></li>
                    <li><a href="#about" onClick={() => setIsOpen(false)}>About</a></li>
                    <li><a href="#uniwork" onClick={() => setIsOpen(false)}>Uni & Work</a></li>
                    <li><a href="#projects" onClick={() => setIsOpen(false)}>Projects</a></li>
                    <li><a href="#contact" onClick={() => setIsOpen(false)}>Contact</a></li>
                </ul>
                <button onClick={toggleLanguage} className="language-switch">
                    Switch Language
                </button>
            </nav>
        </header>
    );
};

export default Header;
