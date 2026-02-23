import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react'

type ThemeType = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeType;
  activeTheme: 'light' | 'dark';
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
}

const themes = {
  light: 'lara-light-green',
  dark: 'lara-dark-green',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    return (localStorage.getItem('theme') as ThemeType) || 'system';
  });

  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  useEffect(() => {
    localStorage.setItem('theme', theme);

    const resolveTheme = () => {
      if (theme === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return theme;
    };

    const currentActive = resolveTheme();
    setActiveTheme(currentActive);

    const themeName = themes[currentActive as keyof typeof themes];

    if (currentActive === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    function loadCssLink(id: string, href: string) {
      let link = document.getElementById(id) as HTMLLinkElement;
      if (link) {
        if (link.href !== href) link.href = href;
        // Move to end of head to ensure it overrides static styles
        document.head.appendChild(link);
      } else {
        link = document.createElement("link");
        link.id = id;
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
      }
    }

    loadCssLink("theme-css", `https://unpkg.com/primereact/resources/themes/${themeName}/theme.css`);

    // Listener for system changes
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        const newActive = mediaQuery.matches ? 'dark' : 'light';
        setActiveTheme(newActive);
        const newThemeName = themes[newActive as keyof typeof themes];
        if (newActive === 'dark') document.body.classList.add('dark');
        else document.body.classList.remove('dark');
        loadCssLink("theme-css", `https://unpkg.com/primereact/resources/themes/${newThemeName}/theme.css`);
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, activeTheme, setTheme, toggleTheme }}>
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
