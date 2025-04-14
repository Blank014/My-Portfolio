import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import '../../styles/LanguageSwitch.css';

const LanguageSwitcher = ({ variant = 'icon' }) => {
    const { language, toggleLanguage, isChanging } = useLanguage();
    const [isAnimating, setIsAnimating] = useState(false);
    const [sliderPosition, setSliderPosition] = useState(language === 'en' ? 0 : 100);

    // Update slider position when language changes
    useEffect(() => {
        setSliderPosition(language === 'en' ? 0 : 100);
    }, [language]);

    const handleLanguageToggle = () => {
        if (isAnimating || isChanging) return; // Prevent multiple rapid clicks

        setIsAnimating(true);
        toggleLanguage();

        // Reset animation state after transition completes
        setTimeout(() => {
            setIsAnimating(false);
        }, 800); // Should be longer than the CSS transition
    };

    // Stylish modern toggle with sliding animation
    if (variant === 'modern') {
        return (
            <button
                className="language-switcher modern-switcher"
                onClick={handleLanguageToggle}
                disabled={isAnimating}
                aria-label={language === 'en' ? 'Switch to German' : 'Switch to English'}
            >
                <div className="modern-switcher-container">
                    <div className={`modern-switcher-option ${language === 'en' ? 'active' : ''}`}>EN</div>
                    <div className={`modern-switcher-option ${language === 'de' ? 'active' : ''}`}>DE</div>
                    <div
                        className={`modern-switcher-slider ${isAnimating ? 'animate-slide' : ''}`}
                        style={{
                            transform: `translateX(${sliderPosition}%)`,
                            transition: isAnimating ? 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'none'
                        }}
                    ></div>
                </div>
            </button>
        );
    }

    // Elegant flag-style switcher with animation
    if (variant === 'flag') {
        return (
            <button
                className="language-switcher"
                onClick={handleLanguageToggle}
                disabled={isAnimating}
                aria-label={language === 'en' ? 'Switch to German' : 'Switch to English'}
            >
                <div className={`language-flag ${isAnimating ? 'animate-flip' : ''}`}>
                    {language === 'en' ? '🇬🇧' : '🇩🇪'}
                </div>
                <span className={isAnimating ? 'lang-changing' : ''}>
                    {language === 'en' ? 'EN' : 'DE'}
                </span>
            </button>
        );
    }

    // Text variant with full language names
    if (variant === 'text') {
        return (
            <button
                className="language-switcher"
                onClick={handleLanguageToggle}
                disabled={isAnimating}
            >
                <i className="fas fa-globe language-switcher-globe"></i>
                <span className={isAnimating ? 'lang-changing' : ''}>
                    {language === 'en' ? 'English' : 'Deutsch'}
                </span>
            </button>
        );
    }

    // Minimal stylish icon variant
    if (variant === 'minimal') {
        return (
            <button
                className="language-switcher minimal-switcher"
                onClick={handleLanguageToggle}
                disabled={isAnimating}
                aria-label={language === 'en' ? 'Switch to German' : 'Switch to English'}
            >
                <div className={`language-code ${isAnimating ? 'animate-pulse' : ''}`}>
                    {language === 'en' ? 'EN' : 'DE'}
                </div>
                <i className="fas fa-exchange-alt language-arrow"></i>
            </button>
        );
    }

    // Default icon variant with just the language code
    return (
        <button
            className="language-switcher"
            onClick={handleLanguageToggle}
            disabled={isAnimating}
        >
            <span className={isAnimating ? 'lang-changing' : ''}>
                {language === 'en' ? 'EN' : 'DE'}
            </span>
        </button>
    );
};

export default LanguageSwitcher;