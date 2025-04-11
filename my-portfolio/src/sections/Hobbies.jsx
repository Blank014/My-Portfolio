import React from "react";
import "../styles/Hobbies.css";
import { useTranslation } from "react-i18next";

const Hobbies = () => {
  const { t } = useTranslation();

  // Example hobbies data - replace with your actual hobbies
  const hobbiesData = [
    {
      id: 1,
      title: "Photography",
      icon: "📷",
      description: "Capturing moments and exploring landscapes through the lens of my camera."
    },
    {
      id: 2,
      title: "Reading",
      icon: "📚",
      description: "Enjoying fiction and non-fiction books, especially on technology and science fiction."
    },
    {
      id: 3,
      title: "Hiking",
      icon: "🥾",
      description: "Exploring nature trails and mountains to stay active and connect with nature."
    },
    {
      id: 4,
      title: "Coding",
      icon: "💻",
      description: "Working on side projects and learning new programming languages and frameworks."
    }
  ];

  return (
    <section id="hobbies" className="hobbies">
      <h2>{t("hobbies")}</h2>
      <p>{t("hobbiesDetails")}</p>

      <div className="hobbies-grid">
        {hobbiesData.map((hobby) => (
          <div className="hobby-card" key={hobby.id}>
            <div className="hobby-icon">
              {hobby.icon}
            </div>
            <h3 className="hobby-title">{hobby.title}</h3>
            <p className="hobby-description">{hobby.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hobbies;
