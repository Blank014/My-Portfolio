import React from 'react';
import '../styles/UniWork.css';
import { useLanguage } from '../context/LanguageContext';

const UniWork = () => {
    const { translations } = useLanguage();

    return (
        <section id="uniwork" className="uniwork">
            <h2>{translations.uniWork}</h2>
            <div className="uniwork-content">
                <div className="education">
                    <h3>{translations.education}</h3>
                    <p>{translations.educationDetails}</p>
                </div>
                <div className="work">
                    <h3>{translations.work}</h3>
                    <p>{translations.workDetails}</p>
                </div>
            </div>
        </section>
    );
};

export default UniWork;
