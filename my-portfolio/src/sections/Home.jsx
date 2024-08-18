import React from "react";
import "../styles/Home.css";
import AvatarCanvas from '../components/AvatarCanvas';
import { useTranslation } from "react-i18next";
import AvatarScene from "../components/AvatarScene";

const Home = () => {
  const { t } = useTranslation();
  return (
    <section id="home" className="home">
      <h1>{t("welcome")}</h1>
      <p>{t("intro")}</p>
      <div className="avatar-container">
        <AvatarCanvas />
      </div>
    </section>
  );
};

export default Home;
