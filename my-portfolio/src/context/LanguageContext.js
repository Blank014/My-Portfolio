import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

// Define resources for i18next
const resources = {
    en: {
        translation: {
            welcome: "Welcome to My Portfolio",
            intro: "Hello! I'm [Your Name], a [Your Profession].",
            about: "About Me",
            aboutText: "I'm a motivated computer science student with a passion for software development. I have solid experience with various programming languages, web technologies, and operating systems. I enjoy solving problems, adapting to new challenges, and continuously improving my skills. I'm always looking for opportunities to grow through hands-on projects and lifelong learning.",
            projects: "Projects",
            contact: "Contact",
            findMe: "You can find me on:",
            uniWork: "Uni & Work",
            education: "Education",
            educationDetails: "I studied [Your Degree] at [Your University].",
            work: "Work Experience",
            workDetails: "I have worked at [Your Company] as a [Your Position].",
            hobbies: "Hobbies",
            hobbiesDetails: "In my free time, I enjoy [Your Hobbies].",
            toggleTheme: "Toggle Theme"
        }
    },
    de: {
        translation: {
            welcome: "Willkommen in meinem Portfolio",
            intro: "Hallo! Ich bin [Your Name], ein [Your Profession].",
            about: "Über mich",
            aboutText: "Ich bin ein motivierter Informatikstudent mit einer Leidenschaft für Softwareentwicklung. Ich habe fundierte Erfahrungen mit verschiedenen Programmiersprachen, Webtechnologien und Betriebssystemen. Es macht mir Spaß, Probleme zu lösen, mich neuen Herausforderungen anzupassen und meine Fähigkeiten ständig weiterzuentwickeln. Ich bin immer auf der Suche nach Möglichkeiten, durch praktische Projekte und lebenslanges Lernen zu wachsen.",
            projects: "Projekte",
            contact: "Kontakt",
            findMe: "Sie können mich finden auf:",
            uniWork: "Uni & Arbeit",
            education: "Bildung",
            educationDetails: "Ich habe [Your Degree] an der [Your University] studiert.",
            work: "Berufserfahrung",
            workDetails: "Ich habe bei [Your Company] als [Your Position] gearbeitet.",
            hobbies: "Hobbys",
            hobbiesDetails: "In meiner Freizeit genieße ich [Your Hobbies].",
            toggleTheme: "Thema umschalten"
        }
    }
};

// Initialize i18next
i18n.use(initReactI18next).init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    }
});

// Create a context for language management
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(i18n.language || 'en');
    const [isChanging, setIsChanging] = useState(false);
    const { t } = useTranslation();

    // Effect to handle language changes
    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language]);

    // Function to change language with animation
    const changeLanguage = (newLang) => {
        if (newLang === language) return;

        // Start animation
        setIsChanging(true);

        // Delay language change to allow animation to start
        setTimeout(() => {
            setLanguage(newLang);

            // End animation after language change is applied
            setTimeout(() => {
                setIsChanging(false);
            }, 600); // Should match the CSS animation duration
        }, 300);
    };

    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'de' : 'en';
        changeLanguage(newLang);
    };

    const value = {
        language,
        isChanging,
        t,
        changeLanguage,
        toggleLanguage
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);

export default i18n;