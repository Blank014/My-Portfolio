import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import "../styles/Header.css";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState("en");
  const { toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : 'auto';
  };

  const toggleLanguage = () => {
    const newLang = language === "en" ? "de" : "en";
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
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
              <span className="logo-text">D.</span>
            </a>
          </div>

          <div className="nav-links">
            <ol>
              {navLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.url}>{link.name}</a>
                </li>
              ))}
            </ol>

            <div className="nav-controls">
              <button onClick={toggleLanguage} aria-label="Change Language">
                {language === "en" ? "DE" : "EN"}
              </button>
              <button onClick={toggleTheme} aria-label="Toggle Theme">
                <i className="fas fa-moon"></i>
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
        <ol>
          {navLinks.map((link, i) => (
            <li key={i}>
              <a href={link.url} onClick={closeMenu}>
                {link.name}
              </a>
            </li>
          ))}
        </ol>
        <div className="button-container">
          <button onClick={toggleLanguage} className="primary-button">
            {language === "en" ? "Deutsch" : "English"}
          </button>
          <button onClick={toggleTheme} className="primary-button">
            {t("toggleTheme")}
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
