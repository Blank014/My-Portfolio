import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import AvatarCanvas from '../components/AvatarCanvas';
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Roles for typing effect
  const roles = ["Developer", "Designer", "Problem Solver"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const currentRole = roles[currentRoleIndex];

  useEffect(() => {
    let timeout;
    // Typing effect
    if (isTyping && text.length < currentRole.length) {
      timeout = setTimeout(() => {
        setText(currentRole.substring(0, text.length + 1));
      }, 100);
    } else if (text === currentRole) {
      // Pause at the end of typing
      timeout = setTimeout(() => {
        setIsTyping(false);
      }, 1500);
    } else if (!isTyping && text.length > 0) {
      // Deleting effect
      timeout = setTimeout(() => {
        setText(text.substring(0, text.length - 1));
      }, 50);
    } else if (!isTyping && text === "") {
      // Switch to next role
      setCurrentRoleIndex((currentRoleIndex + 1) % roles.length);
      setIsTyping(true);
    }

    return () => clearTimeout(timeout);
  }, [text, isTyping, currentRole, currentRoleIndex]);

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <p className="hero-greeting fade-in">Hi, my name is</p>
        <h1 className="hero-title fade-in delay-100">{t("name") || "Your Name"}</h1>
        <h2 className="hero-subtitle fade-in delay-200">
          I'm a <span className="typed-text">{text}</span>
          <span className="typed-cursor"></span>
        </h2>
        <p className="hero-description fade-in delay-300">
          {t("intro") || "I'm a software developer specializing in building exceptional digital experiences. Currently, I'm focused on building accessible, human-centered products."}
        </p>

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
