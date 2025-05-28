import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

/**
 * TranslatedText - A component that wraps translated text with animation effects
 * @param {Object} props
 * @param {string} props.textKey - The translation key
 * @param {string} props.tag - The HTML tag to use (default: span)
 * @param {Object} props.options - Options to pass to i18next translation
 * @param {string} props.className - Additional CSS class names
 */
const TranslatedText = ({ textKey, tag = 'span', options, className = '', ...rest }) => {
    const { t, language, isChanging } = useLanguage();
    const [animClass, setAnimClass] = useState('');
    const Tag = tag;

    useEffect(() => {
        // Skip animation on initial render
        if (!isChanging) return;

        // Apply fade out animation
        setAnimClass('lang-fade-out');

        // Then after a short delay, apply fade in animation
        const timer = setTimeout(() => {
            setAnimClass('lang-fade-in');
        }, 300);

        return () => clearTimeout(timer);
    }, [language, isChanging]);

    return (
        <Tag
            className={`lang-changing ${animClass} ${className}`}
            {...rest}
        >
            {t(textKey, options)}
        </Tag>
    );
};

export default TranslatedText;