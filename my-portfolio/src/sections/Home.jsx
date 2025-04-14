import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import "../styles/TextScramble.css";
import AvatarCanvas from '../components/AvatarCanvas';
import { useTranslation } from "react-i18next";
import TextScramble from "../components/shared/TextScramble";

const Home = () => {
  const { t } = useTranslation();
  const [showNameScramble, setShowNameScramble] = useState(true);
  const [name, setName] = useState("");

  // Matrix quotes for the role section
  const matrixPhrases = [
    "Developer",
    "Designer",
    "Photographer",

  ];

  // Matrix quotes for intro effect (optional)
  const matrixIntroQuotes = [
    "Welcome to the real world",
    "Follow the white rabbit",
    "There is no spoon",
    "Free your mind"
  ];

  // Set the name from translation once available
  useEffect(() => {
    const translatedName = t("Imad-Eddin") || "Imad";
    setName(translatedName);

    // Only show the name scramble animation on initial load
    const timer = setTimeout(() => {
      setShowNameScramble(false);
    }, 4000); // After name animation completes

    return () => clearTimeout(timer);
  }, [t]);

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <p className="hero-greeting fade-in">Hi, my name is</p>
        <h1 className="hero-title fade-in delay-100">
          <TextScramble text={name} delay={200} />
        </h1>
        <h2 className="hero-subtitle fade-in delay-200">
          I'm a <TextScramble
            phrases={matrixPhrases}
            className="typed-text"
            delay={2000}
          />
          <span className="typed-cursor"></span>
        </h2>


        <div className="hero-buttons fade-in delay-400">
          <a href="#projects" className="primary-button">View My Work</a>
          <a href="#contact" className="primary-button">Get In Touch</a>
        </div>
      </div>

      <div className="avatar-container fade-in delay-500">
        <AvatarCanvas />
        <div className="avatar-overlay"></div>
      </div>

      <div className="hero-social fade-in">
        <ul>
          <li>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
          </li>
          <li>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </li>
          <li>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
          </li>
        </ul>
      </div>

      <div className="hero-email fade-in">
        <a href="mailto:email@example.com">email@example.com</a>
      </div>
    </section>
  );
};

export default Home;
