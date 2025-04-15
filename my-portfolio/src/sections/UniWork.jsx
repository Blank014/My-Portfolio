import React from "react";
import "../styles/UniWork.css";
import { useTranslation } from "react-i18next";

const UniWork = () => {
  const { t } = useTranslation();

  // Example timeline data - replace with your actual education and work experience
  const timelineItems = [
    {
      id: 1,
      type: "education",
      year: "2021-Present",
      title: "Bachelor Student in Computer Science",
      location: "Technical University of Braunschweig, Germany",
      description: "Focused on web/app development. Learning about algorithms, data structures, and software engineering principles."
    },
    {
      id: 2,
      type: "work",
      year: "2024-Present",
      title: "Python Developer",
      location: "MPA, Braunschweig",
      description: "Developing a responsive desktop application serving as an internal tool using Python."
    },
    {
      id: 3,
      type: "education",
      year: "2024",
      title: "Full-Stack Web Development Bootcamp",
      location: "Udemy",
      description: "Intensive course covering full-stack development with HTML, CSS, Javascript, Node, React, PostgreSQL, Web3 and DApps"
    },
    {
      id: 4,
      type: "work",
      year: "2024-Present",
      title: "System Administrator",
      location: "IFAS TU Braunschweig, City",
      description: "Maintaining and managing the institute's IT infrastructure, ensuring smooth operation of systems and networks."
    }
  ];

  return (
    <section id="uniwork" className="uniwork">
      <h2>{t("uniWork")}</h2>
      <div className="timeline">
        {timelineItems.map((item, index) => (
          <div
            key={item.id}
            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
          >
            <div className="timeline-content">
              <span className="timeline-year">{item.year}</span>
              <h3 className="timeline-title">{item.title}</h3>
              <div className="timeline-location">{item.location}</div>
              <p className="timeline-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UniWork;
