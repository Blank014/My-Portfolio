import React, { useState } from "react";
import "../styles/Hobbies.css";
import { useLanguage } from "../context/LanguageContext";
import PhotoGallery from "../components/PhotoGallery/PhotoGallery";

const Hobbies = () => {
  const { t } = useLanguage();
  const [showPhotoGallery, setShowPhotoGallery] = useState(false);

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
          <div
            className="hobby-card"
            key={hobby.id}
            onClick={() => {
              if (hobby.id === 1) { // Photography hobby
                setShowPhotoGallery(!showPhotoGallery);
              }
            }}
          >
            <div className="hobby-icon">
              {hobby.icon}
            </div>
            <h3 className="hobby-title">{hobby.title}</h3>
            <p className="hobby-description">{hobby.description}</p>
            {hobby.id === 1 && (
              <button className="view-photos-btn">
                {showPhotoGallery ? t("hidePhotos") : t("viewPhotos")}
              </button>
            )}
          </div>
        ))}
      </div>

      {showPhotoGallery && (
        <div className="photo-gallery-container">
          <PhotoGallery />
        </div>
      )}
    </section>
  );
};

export default Hobbies;
