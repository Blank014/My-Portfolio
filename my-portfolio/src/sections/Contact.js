import React from 'react';
import '../styles/Contact.css';
import { useTranslation } from 'react-i18next';


const Contact = () => {
    const { t } = useTranslation();

    return (
        <section id="contact" className="contact">
            <h2>{t('contact')}</h2>
            <p>{t('findMe')}</p>
            <ul>
                <li><a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="mailto:your.email@example.com">Email</a></li>
                {/* Add more social links as needed */}
            </ul>
        </section>
    );
};

export default Contact;
