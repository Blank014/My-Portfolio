import React, { useState } from "react";
import "../styles/About.css";
import "../styles/SkillBar.css";
import { useTranslation } from "react-i18next";
import SkillBar from "../components/shared/SkillBar";
// Import the profile image
import profileImage from "../assets/images/Profile_.jpg";

const About = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('skills');

  // Skills data - we'll keep the level property for possible future categorization
  // but we won't display it anymore
  const skillsData = [
    { name: "JavaScript", level: 75 },
    { name: "React", level: 70 },
    { name: "Node.js", level: 40 },
    { name: "Three.js", level: 50 },
    { name: "HTML & CSS", level: 95 },
    { name: "Responsive Design", level: 88 },
    { name: "Flutter", level: 65 },
    { name: "Python", level: 85 },
    { name: "C & C++", level: 70 },
    { name: "Java", level: 80 },
    { name: "Linux", level: 90 }
  ];

  // Education data
  const educationData = [
    {
      degree: "A-Levels",
      institution: "Freiberg College",
      year: "2018-2021",
      description: "Focus on Mathematics and English"
    },
    {
      degree: "Computer Science Student",
      institution: "Technical University of Braunschweig",
      year: "2021-Present",
      description: "Focus on Software Engineering"
    }
  ];

  // Certifications
  const certificationsData = [
    {
      name: "Python Certified Developer",
      issuer: "openHPI",
      year: "2020"
    },
    {
      name: "Full-Stack Web Development",
      issuer: "Udemy",
      year: "2024"
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'skills':
        return (
          <div className="skills-content">
            {skillsData.map((skill, index) => (
              <SkillBar
                key={index}
                skill={skill.name}
                data-key={index}
              // Let the component use theme colors instead
              />
            ))}
          </div>
        );
      case 'education':
        return (
          <div className="education-content">
            {educationData.map((edu, index) => (
              <div className="education-item" key={index}>
                <div className="education-year">{edu.year}</div>
                <h4 className="education-degree">{edu.degree}</h4>
                <div className="education-institution">{edu.institution}</div>
                <h5 className="education-description">{edu.description}</h5>
              </div>
            ))}
          </div>
        );
      case 'certifications':
        return (
          <div className="certifications-content">
            {certificationsData.map((cert, index) => (
              <div className="certification-item" key={index}>
                <div className="certification-year">{cert.year}</div>
                <h4 className="certification-name">{cert.name}</h4>
                <div className="certification-issuer">{cert.issuer}</div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-heading">
          <h2>About Me</h2>
        </div>

        <div className="about-container">
          <div className="about-content fade-in">

            <p>
              {t("aboutText")}
            </p>

            <div className="about-tabs">
              <button
                className={`about-tab-button ${activeTab === 'skills' ? 'active' : ''}`}
                onClick={() => setActiveTab('skills')}
              >
                <i className="fas fa-code"></i>
                Skills
              </button>
              <button
                className={`about-tab-button ${activeTab === 'education' ? 'active' : ''}`}
                onClick={() => setActiveTab('education')}
              >
                <i className="fas fa-graduation-cap"></i>
                Education
              </button>
              <button
                className={`about-tab-button ${activeTab === 'certifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('certifications')}
              >
                <i className="fas fa-certificate"></i>
                Certifications
              </button>
              <div className="tab-spacer"></div>
              <a href="/Lebenslauf.pdf" className="resume-download-button" target="_blank" rel="noopener noreferrer" title="Download Resume">
                <i className="fas fa-download"></i>
              </a>
            </div>

            <div className="about-tab-content">
              {renderTabContent()}
            </div>
          </div>

          <div className="about-image-container fade-in delay-100">
            <div className="about-image-wrapper">
              <img
                className="about-image"
                src={profileImage}
                alt="Profile"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
