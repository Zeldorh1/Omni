import React, { createContext, useState, useContext } from 'react';

// Create a Context
const ThemeContext = createContext<any>(null);

// Custom hook for consuming the context
export const useTheme = () => {
  return useContext(ThemeContext);
};

// Provider component
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
