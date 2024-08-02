import React from 'react';
import '../styles/Contact.css';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
    const { translations } = useLanguage();

    return (
        <section id="contact" className="contact">
            <h2>{translations.contact}</h2>
            <p>{translations.findMe}</p>
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
