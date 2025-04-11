import React, { useState } from "react";
import "../styles/About.css";
import "../styles/SkillBar.css";
import { useTranslation } from "react-i18next";
import SkillBar from "../components/shared/SkillBar";

const About = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('skills');

  // Skills with proficiency levels
  const skillsData = [
    { name: "JavaScript (ES6+)", level: 92 },
    { name: "React", level: 90 },
    { name: "Node.js", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "Three.js", level: 75 },
    { name: "HTML & CSS", level: 95 },
    { name: "Responsive Design", level: 88 },
    { name: "RESTful APIs", level: 87 }
  ];

  // Education data
  const educationData = [
    {
      degree: "Master of Science in Computer Science",
      institution: "University of Technology",
      year: "2020-2022",
      description: "Specialized in Web Technologies and Human-Computer Interaction"
    },
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "City University",
      year: "2016-2020",
      description: "Focus on Software Engineering and Database Systems"
    }
  ];

  // Certifications
  const certificationsData = [
    {
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      year: "2023"
    },
    {
      name: "Full Stack Web Development",
      issuer: "Udacity",
      year: "2021"
    },
    {
      name: "React Advanced Patterns",
      issuer: "Frontend Masters",
      year: "2022"
    }
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
                level={skill.level}
                color={`hsl(${260 + index * 10}, 70%, 65%)`}
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
                <p className="education-description">{edu.description}</p>
              </div>
            ))}
          </div>
        );
      case 'certifications':
        return (
          <div className="certifications-content">
            {certificationsData.map((cert, index) => (
              <div className="certification-item" key={index}>
                <span className="certification-year">{cert.year}</span>
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
              Hello! I'm a developer passionate about building digital experiences that are both
              functional and beautiful. My journey in web development began during university,
              where I discovered my love for creating things that live on the internet.
            </p>

            <p>
              My focus is on crafting accessible, responsive, and engaging user interfaces
              that solve real-world problems. I enjoy working on the full stack, from
              designing intuitive UI/UX to implementing robust backend systems.
            </p>

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
            </div>

            <div className="about-tab-content">
              {renderTabContent()}
            </div>

            <div className="resume-download">
              <a href="/resume.pdf" className="primary-button" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-file-download"></i> Download Resume
              </a>
            </div>
          </div>

          <div className="about-image-container fade-in delay-100">
            <div className="about-image-wrapper">
              <img
                className="about-image"
                src="https://via.placeholder.com/300x300"
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
