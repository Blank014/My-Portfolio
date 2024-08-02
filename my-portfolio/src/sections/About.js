import React from 'react';
import '../styles/About.css';
import { useTranslation } from 'react-i18next';


const About = () => {
    const { t } = useTranslation();

    /*  const Photography = () => {
         const { t } = useTranslation();
 
         return (
             <div>
                 <h1>{t('photographyPage.msg')}</h1>
             </div>
         );
     }; */

    return (
        <section id="about" className="about">
            <h2>{t('about')}</h2>
            <p>{t('aboutText')}</p>
        </section>
    );
};

export default About;
