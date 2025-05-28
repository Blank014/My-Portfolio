import React, { useState } from "react";
import "../styles/Hobbies.css";
import { useLanguage } from "../context/LanguageContext";
import PhotoGallery from "../components/PhotoGallery/PhotoGallery";

const Hobbies = () => {
  const { t, language } = useLanguage();
  const [showPhotoGallery, setShowPhotoGallery] = useState(false);

  // Define hobbies data with icons
  const hobbiesData = [
    {
      id: 1,
      title: {
        en: "Photography",
        de: "Fotografie"
      },
      description: {
        en: "Capturing moments and exploring landscapes through the lens of my camera.",
        de: "Momente einfangen und Landschaften durch das Objektiv meiner Kamera erkunden."
      },
      icon: "fa-camera"
    },
    {
      id: 2,
      title: {
        en: "Reading",
        de: "Lesen"
      },
      description: {
        en: "Exploring worlds through fiction and expanding knowledge with non-fiction books.",
        de: "Welten durch Fiktion erkunden und Wissen mit Sachbüchern erweitern."
      },
      icon: "fa-book"
    }
  ];

  const handleGoodreadsClick = () => {
    window.open("https://www.goodreads.com/imad_alkuzbari", "_blank");
  };

  return (
    <section id="hobbies" className="hobbies">
      <h2>{t("hobbies")}</h2>
      <p>{t("hobbiesDetails")}</p>

      <div className="hobbies-grid-center">
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
              <i className={`fas ${hobby.icon}`}></i>
            </div>
            <h3 className="hobby-title">{hobby.title[language]}</h3>
            <p className="hobby-description">{hobby.description[language]}</p>

            {hobby.id === 1 && (
              <button className="view-photos-btn">
                <i className="fas fa-images"></i> {showPhotoGallery ? t("hidePhotos") : t("viewPhotos")}
              </button>
            )}

            {hobby.id === 2 && (
              <button
                className="goodreads-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleGoodreadsClick();
                }}
              >
                <i className="fas fa-book-reader"></i> {language === "en" ? "Connect on Goodreads" : "Auf Goodreads verbinden"}
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
