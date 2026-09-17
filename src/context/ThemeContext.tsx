import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeMode } from '../types';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  isLight: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dmd_theme_mode') as ThemeMode | null;
      if (saved === 'darkroom' || saved === 'studiolight') {
        return saved;
      }
    }
    return 'darkroom';
  });

  const isLight = theme === 'studiolight';

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('dmd_theme_mode', newTheme);
    }
  };

  const toggleTheme = () => {
    const next = theme === 'darkroom' ? 'studiolight' : 'darkroom';
    setTheme(next);
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      if (isLight) {
        document.documentElement.classList.add('light-mode');
        document.documentElement.classList.remove('dark-mode');
        document.body.className = 'bg-stone-100 text-stone-900 font-sans antialiased selection:bg-amber-500/30 selection:text-amber-900 transition-colors duration-200';
      } else {
        document.documentElement.classList.add('dark-mode');
        document.documentElement.classList.remove('light-mode');
        document.body.className = 'bg-neutral-950 text-neutral-100 font-sans antialiased selection:bg-amber-500/30 selection:text-amber-200 transition-colors duration-200';
      }
    }
  }, [theme, isLight]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isLight }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
