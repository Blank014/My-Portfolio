import React from 'react';
import '../styles/Home.css';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
    const { translations } = useLanguage();

    return (
        <section id="home" className="home">
            <h1>{translations.welcome}</h1>
            <p>{translations.intro}</p>
        </section>
    );
};

export default Home;
