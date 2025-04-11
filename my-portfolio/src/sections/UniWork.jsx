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
      year: "2020-2024",
      title: "Bachelor's Degree in Computer Science",
      location: "University Name, City",
      description: "Focused on web development, algorithms, and data structures. Participated in various hackathons and coding competitions."
    },
    {
      id: 2,
      type: "work",
      year: "2023-Present",
      title: "Frontend Developer",
      location: "Company Name, City",
      description: "Developing responsive web applications using React. Working with a team to implement new features and maintain existing codebase."
    },
    {
      id: 3,
      type: "education",
      year: "2019-2020",
      title: "Web Development Bootcamp",
      location: "Coding Academy, City",
      description: "Intensive program covering full-stack development with JavaScript, React, Node.js, and MongoDB."
    },
    {
      id: 4,
      type: "work",
      year: "2021-2023",
      title: "Web Design Intern",
      location: "Design Studio, City",
      description: "Created UI designs and implemented them using HTML, CSS, and JavaScript. Collaborated with senior designers on client projects."
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
