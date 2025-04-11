import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

// Updated theme colors to match CSS variables in App.css
const darkTheme = {
    background: '#2D283E',
    surface: '#564F6F',
    surfaceVariant: '#4C495D',
    primary: '#802BB1',
    secondary: '#9A4ECA',
    textPrimary: '#D1D7E0',
    textSecondary: '#B8BEC7'
};

const lightTheme = {
    background: '#D1D7E0',
    surface: '#C3C9D3',
    surfaceVariant: '#B5BBC6',
    primary: '#802BB1',
    secondary: '#6B24A0',
    textPrimary: '#2D283E',
    textSecondary: '#564F6F'
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(darkTheme);
    const [isDarkTheme, setIsDarkTheme] = useState(true);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === darkTheme ? lightTheme : darkTheme));
        setIsDarkTheme((prevIsDark) => !prevIsDark);
    };

    useEffect(() => {
        // Apply theme by toggling the light-theme class on the body
        if (isDarkTheme) {
            document.body.classList.remove('light-theme');
        } else {
            document.body.classList.add('light-theme');
        }

        // For direct theme object use in components that don't use CSS variables
        document.body.style.backgroundColor = theme.background;
        document.body.style.color = theme.textPrimary;
    }, [theme, isDarkTheme]);

    return (
        <ThemeContext.Provider value={{ theme, isDarkTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
