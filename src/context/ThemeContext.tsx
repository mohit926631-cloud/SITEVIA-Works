import React, { createContext, useContext, useEffect } from 'react';

type Theme = 'light';

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
  useEffect(() => {
    const enforceLightMode = () => {
      const root = document.documentElement;
      root.classList.remove('dark');
      root.classList.add('light');
      root.style.colorScheme = 'light';
      if (document.body) {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        document.body.style.colorScheme = 'light';
      }
      try {
        localStorage.setItem('sitevia_theme', 'light');
      } catch {}
    };

    enforceLightMode();

    // Prevent system dark mode or any third-party script from applying dark theme
    const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
    const handleMediaChange = () => {
      enforceLightMode();
    };
    mediaQuery?.addEventListener?.('change', handleMediaChange);

    const observer = new MutationObserver(() => {
      const root = document.documentElement;
      if (root.classList.contains('dark') || root.style.colorScheme !== 'light') {
        enforceLightMode();
      }
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] });

    return () => {
      mediaQuery?.removeEventListener?.('change', handleMediaChange);
      observer.disconnect();
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: 'light', toggleTheme: () => {}, setTheme: () => {} }}>
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


