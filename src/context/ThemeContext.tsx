import  { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react'

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

const themes = {
  light: 'lara-light-blue',
  dark: 'lara-dark-blue',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>('light');

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  // Load theme CSS dynamically
  useEffect(() => {
    const themeName = themes[theme];
    const existingLink = document.getElementById('theme-css') as HTMLLinkElement;
    if (existingLink) {
      existingLink.href = `https://unpkg.com/primereact/resources/themes/${themeName}/theme.css`;
    } else {
      const link = document.createElement('link');
      link.id = 'theme-css';
      link.rel = 'stylesheet';
      link.href = `https://unpkg.com/primereact/resources/themes/${themeName}/theme.css`;
      document.head.appendChild(link);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for easy access
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
