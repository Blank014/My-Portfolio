
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'de',
        interpolation: {
            escapeValue: false // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: {
                    welcome: "Welcome to My Portfolio",
                    intro: "Hello! I'm [Your Name], a [Your Profession].",
                    about: "About Me",
                    aboutText: "I'm a [Your Profession] based in [Your Location]. I graduated from [Your University] with a degree in [Your Degree]. In my free time, I enjoy [Hobbies].",
                    projects: "Projects",
                    contact: "Contact",
                    findMe: "You can find me on:",
                    uniWork: "Uni & Work",
                    education: "Education",
                    educationDetails: "I studied [Your Degree] at [Your University].",
                    work: "Work Experience",
                    workDetails: "I have worked at [Your Company] as a [Your Position].",
                    hobbies: "Hobbies",
                    hobbiesDetails: "In my free time, I enjoy [Your Hobbies]."
                }
            },
            de: {
                translation: {
                    welcome: "Willkommen in meinem Portfolio",
                    intro: "Hallo! Ich bin [Your Name], ein [Your Profession].",
                    about: "Über mich",
                    aboutText: "Ich bin ein [Your Profession] aus [Your Location]. Ich habe meinen Abschluss in [Your Degree] von der [Your University] gemacht. In meiner Freizeit genieße ich [Hobbies].",
                    projects: "Projekte",
                    contact: "Kontakt",
                    findMe: "Sie können mich finden auf:",
                    uniWork: "Uni & Arbeit",
                    education: "Bildung",
                    educationDetails: "Ich habe [Your Degree] an der [Your University] studiert.",
                    work: "Berufserfahrung",
                    workDetails: "Ich habe bei [Your Company] als [Your Position] gearbeitet.",
                    hobbies: "Hobbys",
                    hobbiesDetails: "In meiner Freizeit genieße ich [Your Hobbies]."
                }
            }
        }
    });

export default i18n;








/* const LanguageContext = createContext();

const translations = {
    en: {
        welcome: "Welcome to My Portfolio",
        intro: "Hello! I'm [Your Name], a [Your Profession].",
        about: "About Me",
        aboutText: "I'm a [Your Profession] based in [Your Location]. I graduated from [Your University] with a degree in [Your Degree]. In my free time, I enjoy [Hobbies].",
        projects: "Projects",
        contact: "Contact",
        findMe: "You can find me on:",
        uniWork: "Uni & Work",
        education: "Education",
        educationDetails: "I studied [Your Degree] at [Your University].",
        work: "Work Experience",
        workDetails: "I have worked at [Your Company] as a [Your Position].",
        hobbies: "Hobbies",
        hobbiesDetails: "In my free time, I enjoy [Your Hobbies]."
    },
    de: {
        welcome: "Willkommen in meinem Portfolio",
        intro: "Hallo! Ich bin [Your Name], ein [Your Profession].",
        about: "Über mich",
        aboutText: "Ich bin ein [Your Profession] aus [Your Location]. Ich habe meinen Abschluss in [Your Degree] von der [Your University] gemacht. In meiner Freizeit genieße ich [Hobbies].",
        projects: "Projekte",
        contact: "Kontakt",
        findMe: "Sie können mich finden auf:",
        uniWork: "Uni & Arbeit",
        education: "Bildung",
        educationDetails: "Ich habe [Your Degree] an der [Your University] studiert.",
        work: "Berufserfahrung",
        workDetails: "Ich habe bei [Your Company] als [Your Position] gearbeitet.",
        hobbies: "Hobbys",
        hobbiesDetails: "In meiner Freizeit genieße ich [Your Hobbies]."
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
 */