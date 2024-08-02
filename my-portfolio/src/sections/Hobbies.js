import React from 'react';
import '../styles/Hobbies.css';
import { useLanguage } from '../context/LanguageContext';

const Hobbies = () => {
    const { translations } = useLanguage();

    return (
        <section id="hobbies" className="hobbies">
            <h2>{translations.hobbies}</h2>
            <p>{translations.hobbiesDetails}</p>
        </section>
    );
};

export default Hobbies;
