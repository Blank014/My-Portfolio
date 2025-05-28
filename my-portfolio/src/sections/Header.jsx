import React, { useState, useEffect } from "react";
import "../styles/Header.css";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import TranslatedText from "../components/shared/TranslatedText";
import LanguageSwitcher from "../components/shared/LanguageSwitcher";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { toggleTheme, isDarkTheme } = useTheme();
  const { t } = useLanguage();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : 'auto';
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'auto';
    };
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const navLinks = [
    { name: "Home", url: "#home" },
    { name: t("about"), url: "#about" },
    { name: t("uniWork"), url: "#uniwork" },
    { name: t("projects"), url: "#projects" },
    { name: t("hobbies"), url: "#hobbies" },
    { name: t("contact"), url: "#contact" }
  ];

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo">
            <a href="#home" aria-label="home">
              <span className="logo-text">IK.</span>
            </a>
          </div>

          <div className="nav-links">
            <ol>              {navLinks.map((link, i) => (
              <li key={i}>
                <a href={link.url}>
                  {i === 0 ? link.name : <TranslatedText textKey={link.name} />}
                </a>
              </li>
            ))}
            </ol>

            <div className="nav-controls">
              <LanguageSwitcher variant="modern" />
              <button
                onClick={toggleTheme}
                aria-label={isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"}
                className="theme-toggle-btn"
              >
                <i className={`fas ${isDarkTheme ? 'fa-sun' : 'fa-moon'}`}></i>
              </button>
            </div>
          </div>

          <button
            className={`burger-menu ${isOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <ol>          {navLinks.map((link, i) => (
          <li key={i}>
            <a href={link.url} onClick={closeMenu}>
              {i === 0 ? link.name : <TranslatedText textKey={link.name} />}
            </a>
          </li>
        ))}
        </ol>
        <div className="button-container">
          <LanguageSwitcher variant="text" />
          <button onClick={toggleTheme} className="primary-button">
            <i className={`fas ${isDarkTheme ? 'fa-sun' : 'fa-moon'} me-2`}></i>
            <TranslatedText textKey="toggleTheme" />
          </button>
        </div>
      </div>

      <div
        className={`overlay ${isOpen ? 'active' : ''}`}
        onClick={closeMenu}
        aria-hidden={!isOpen}
      ></div>
    </>
  );
};

export default Header;
