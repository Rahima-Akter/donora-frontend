import { useTheme } from './ThemeProvider';
import { CiLight } from 'react-icons/ci';
import { RxMoon } from 'react-icons/rx';

const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="fixed bottom-3 right-3 z-50 p-2 bg-Red/60 text-white rounded-full shadow-lg hover:bg-Red/90 transition duration-300"
        >
            {theme === 'light' ? (
                <CiLight />
            ) : (
                <RxMoon />
            )}
        </button>
    );
};

export default ThemeToggleButton;
