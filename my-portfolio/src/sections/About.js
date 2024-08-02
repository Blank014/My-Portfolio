import React from 'react';
import '../styles/About.css';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
    const { translations } = useLanguage();

    return (
        <section id="about" className="about">
            <h2>{translations.about}</h2>
            <p>{translations.aboutText}</p>
        </section>
    );
};

export default About;
