import React from 'react';
import '../styles/Home.css';
import { useTranslation } from 'react-i18next';


const Home = () => {
    const { t } = useTranslation();
    return (
        <section id="home" className="home">
            <h1>{t('welcome')}</h1>
            <p>{t('intro')}</p>
        </section>
    );
};

export default Home;
