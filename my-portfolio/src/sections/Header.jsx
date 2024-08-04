import { useTranslation } from "react-i18next";
import React, { useState } from "react";

import "../styles/Header.css";
import { useTheme } from "../context/ThemeContext";

const Header = ({ header }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "de" : "en"));
    i18n.changeLanguage(language);
  };

  const { toggleTheme } = useTheme();

  return (
    <header className={`header ${header}`}>
      <nav>
        <div className="burger-menu" onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li>
            <a href="#home" onClick={() => setIsOpen(false)}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" onClick={() => setIsOpen(false)}>
              About
            </a>
          </li>
          <li>
            <a href="#uniwork" onClick={() => setIsOpen(false)}>
              Uni & Work
            </a>
          </li>{" "}
          <li>
            <a href="#projects" onClick={() => setIsOpen(false)}>
              Projects
            </a>
          </li>
          <li>
            <a href="#hobbies" onClick={() => setIsOpen(false)}>
              Hobbies
            </a>
          </li>
          <li>
            <a href="#contact" onClick={() => setIsOpen(false)}>
              Contact
            </a>
          </li>
        </ul>
        <button onClick={toggleLanguage} className="language-switch">
          Switch Language
        </button>
        <button onClick={toggleTheme} className="theme-switch">
          Toggle Theme
        </button>
      </nav>
    </header>
  );
};

export default Header;
