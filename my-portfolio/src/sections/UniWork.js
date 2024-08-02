import React from 'react';
import '../styles/UniWork.css';
import { useTranslation } from 'react-i18next';

const UniWork = () => {
    const { t } = useTranslation();

    return (
        <section id="uniwork" className="uniwork">
            <h2>{t('uniWork')}</h2>
            <div className="uniwork-content">
                <div className="education">
                    <h3>{t('education')}</h3>
                    <p>{t('educationDetails')}</p>
                </div>
                <div className="work">
                    <h3>{t('work')}</h3>
                    <p>{t('workDetails')}</p>
                </div>
            </div>
        </section>
    );
};

export default UniWork;
