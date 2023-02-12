import { createContext } from 'react';

export const themes = {
  light: {
    color: '#000000',
    background: '#ffffff',
    light: true
  },
  dark: {
    color: '#ffffff',
    background: 'black',
    light: false
  },
};

export const ThemeContext = createContext({
  theme: themes.light,
  toggleTheme: () => {},
});
