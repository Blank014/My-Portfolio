import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

const darkTheme = {
    background: '#460066',
    primary: '#650076',
    secondary: '#BE58CF',
    accent: '#73A3B3',
    text: '#FFFFFF'
};

const lightTheme = {
    background: '#BFACC8',
    primary: '#C8C6D7',
    secondary: '#783F8E',
    accent: '#4F1271',
    text: '#000000'
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(darkTheme);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === darkTheme ? lightTheme : darkTheme));
    };

    useEffect(() => {
        document.body.style.backgroundColor = theme.background;
        document.body.style.color = theme.text;
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
