import { createContext, useContext, useState, useEffect } from 'react';
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
  // useEffect(() => {
  //   const themeName = themes[theme];
  //    const existingLink = document.getElementById('theme-css') as HTMLLinkElement;
  //   if (existingLink) {
  //     existingLink.href = `https://unpkg.com/primereact/resources/themes/${themeName}/theme.css`;
  //   } else {
  //     const link = document.createElement('link');
  //     link.id = 'theme-css';
  //     link.rel = 'stylesheet';
  //     link.href = `https://unpkg.com/primereact/resources/themes/${themeName}/theme.css`;
  //     document.head.appendChild(link);
  //   }
  //   const existingVariable = document.getElementById('variable-css') as HTMLLinkElement;
  //   if (existingVariable) {
  //     existingVariable.href = 'http://localhost:5173/src/styles/variables.css';
  //   } else {
  //     const link = document.createElement('link');
  //     link.id = 'variable-css';
  //     link.rel = 'stylesheet';
  //     link.href = 'http://localhost:5173/src/styles/variables.css';
  //     document.head.appendChild(link);
  //   }
  // }, [theme]);

  useEffect(() => {
    const themeName = themes[theme];

    /** -------------------------------
     *  1. LOAD PRIMEREACT THEME
     --------------------------------*/
    function loadCssLink(id: string, href: string) {
      let link = document.getElementById(id) as HTMLLinkElement;

      if (link) {
        // Update only if changed
        if (link.href !== href) {
          link.href = href;
        }
      } else {
        // Create <link> tag
        link = document.createElement("link");
        link.id = id;
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
      }
    }

    // Load PrimeReact theme
    loadCssLink(
      "theme-css",
      `https://unpkg.com/primereact/resources/themes/${themeName}/theme.css`
    );

    /** -------------------------------
     *  2. LOAD YOUR variables.css
     --------------------------------*/
    loadCssLink(
      "variables-css",
      `${window.location.origin}/src/styles/variables.css`
    );

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
