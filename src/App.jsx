import React, { useMemo, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import AppContext from './AppContext';
import MainApp from './MainApp';
import GlobalStyles from './theme/GlobalStyles';
import { lightTheme, darkTheme } from './theme/themes';

function App() {
  window.matchMedia = null;
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedValue = localStorage.getItem('darkMode');
    return storedValue === null ? true : storedValue === 'true';
  });

  const darkMode = useMemo(() => ({
    value: isDarkMode,
    toggle: () => {
      setIsDarkMode((previousValue) => {
        const nextValue = !previousValue;
        localStorage.setItem('darkMode', String(nextValue));
        return nextValue;
      });
    },
  }), [isDarkMode]);

  const [language, setLanguage] = useState(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage === 'pt' || storedLanguage === 'en') return storedLanguage;
    return navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en';
  });

  const languageState = useMemo(() => ({
    value: language,
    toggle: () => {
      setLanguage((previousLanguage) => {
        const nextLanguage = previousLanguage === 'pt' ? 'en' : 'pt';
        localStorage.setItem('language', nextLanguage);
        return nextLanguage;
      });
    },
  }), [language]);

  const contextValue = useMemo(
    () => ({ darkMode, language: languageState }),
    [darkMode, languageState],
  );

  return (
    <AppContext.Provider value={contextValue}>
      <ThemeProvider theme={darkMode.value ? darkTheme : lightTheme}>
        <GlobalStyles />
        <div className="App">
          <BrowserRouter>
            <MainApp />
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
