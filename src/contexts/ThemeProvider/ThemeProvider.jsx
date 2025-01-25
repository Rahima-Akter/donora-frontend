import React, { createContext, useContext, useState, useEffect } from 'react';

// ThemeContext to hold theme state
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => {
    return useContext(ThemeContext);
};

// ThemeProvider component to wrap your app
export const ThemeProvider = ({ children }) => {
    // State to manage the theme (light or dark)
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    // toggle theme
    const toggleTheme = () => {
        setTheme((prev) => {
            const newTheme = prev === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme); // Save the theme to localStorage
            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
