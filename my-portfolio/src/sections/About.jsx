import React from "react";
import "../styles/About.css";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="about">
      <h2>{t("about")}</h2>
      <p>{t("aboutText")}</p>
    </section>
  );
};

export default About;
