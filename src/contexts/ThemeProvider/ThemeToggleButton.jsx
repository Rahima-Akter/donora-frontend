import React from 'react';
import { useTheme } from './ThemeProvider';

const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="fixed bottom-3 right-3 z-50 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
        >
            {theme === 'light' ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v3m4.95-1.05a9 9 0 11-1.4 1.4M21 12h-3m-4.95 1.05a9 9 0 11-1.4-1.4M12 21v-3m-8.95-1.05a9 9 0 111.4-1.4M3 12H0m4.95-5.95A9 9 0 1112 3"
                    />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v3m4.95-1.05a9 9 0 11-1.4 1.4M21 12h-3m-4.95 1.05a9 9 0 11-1.4-1.4M12 21v-3m-8.95-1.05a9 9 0 111.4-1.4M3 12H0m4.95-5.95A9 9 0 1112 3"
                    />
                </svg>
            )}
        </button>
    );
};

export default ThemeToggleButton;
