import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  const buttonStyles = {
    light: {
      backgroundColor: '#f0f0f0',
      color: '#333',
      border: '1px solid #ddd'
    },
    dark: {
      backgroundColor: '#333',
      color: '#fff',
      border: '1px solid #555'
    }
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'all 0.3s ease',
        ...buttonStyles[theme]
      }}
    >
      {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default ThemeToggle;