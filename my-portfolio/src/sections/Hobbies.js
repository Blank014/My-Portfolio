import React from 'react';
import '../styles/Hobbies.css';
import { useTranslation } from 'react-i18next';

const Hobbies = () => {
    const { t } = useTranslation();

    return (
        <section id="hobbies" className="hobbies">
            <h2>{t('hobbies')}</h2>
            <p>{t('hobbiesDetails')}</p>
        </section>
    );
};

export default Hobbies;
