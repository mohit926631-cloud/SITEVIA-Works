import React, { createContext, useContext, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always lock theme to light regardless of OS/system preferences
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark');
    root.classList.add('light');
    root.style.colorScheme = 'light';
    
    document.body.classList.remove('dark');
    document.body.classList.add('light');

    // Overwrite any legacy dark storage items
    try {
      localStorage.setItem('viteweb_theme', 'light');
      localStorage.setItem('sitevia_theme', 'light');
    } catch {
      // Ignore storage errors in restricted sandboxes
    }
  }, []);

  const toggleTheme = () => {
    // Intentionally no-op: Site is permanently in premium light theme
  };

  const setTheme = (_newTheme: Theme) => {
    // Intentionally keep light
  };

  return (
    <ThemeContext.Provider value={{ theme: 'light', toggleTheme, setTheme }}>
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

