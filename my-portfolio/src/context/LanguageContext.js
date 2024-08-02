import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

const translations = {
    en: {
        welcome: "Welcome to My Portfolio",
        intro: "Hello! I'm [Your Name], a [Your Profession].",
        about: "About Me",
        aboutText: "I'm a [Your Profession] based in [Your Location]. I graduated from [Your University] with a degree in [Your Degree]. In my free time, I enjoy [Hobbies].",
        projects: "Projects",
        contact: "Contact",
        findMe: "You can find me on:",
    },
    de: {
        welcome: "Willkommen in meinem Portfolio",
        intro: "Hallo! Ich bin [Your Name], ein [Your Profession].",
        about: "Über mich",
        aboutText: "Ich bin ein [Your Profession] aus [Your Location]. Ich habe meinen Abschluss in [Your Degree] von der [Your University] gemacht. In meiner Freizeit genieße ich [Hobbies].",
        projects: "Projekte",
        contact: "Kontakt",
        findMe: "Sie können mich finden auf:",
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'de' : 'en'));
    };

    return (
        <LanguageContext.Provider value={{ language, translations: translations[language], toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
