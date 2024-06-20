import React, {createContext, useState, useEffect} from 'react';
import {useColorScheme} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState('light');

  // useEffect(() => {
  //   // Load theme from AsyncStorage on component mount
  //   const loadTheme = async () => {
  //     try {
  //       const storedTheme = await AsyncStorage.getItem('theme');
  //       if (storedTheme !== null) {
  //         setTheme(storedTheme);
  //       } else {
  //         // If no theme is stored, set the theme based on system preference
  //         setTheme(systemTheme || 'light');
  //       }
  //     } catch (error) {
  //       console.error('Error loading theme from AsyncStorage:', error);
  //     }
  //   };
  //   loadTheme();
  // }, [systemTheme]);

  const toggleTheme = newTheme => {
    setTheme(newTheme);
    // Save theme to AsyncStorage
    // AsyncStorage.setItem('theme', newTheme).catch(error =>
    //   console.error('Error saving theme to AsyncStorage:', error),
    // );
  };

  // const setSystemTheme = () => {
  //   setTheme(systemTheme);
  //   Save theme to AsyncStorage
  //   AsyncStorage.setItem('theme', systemTheme).catch(error =>
  //     console.error('Error saving theme to AsyncStorage:', error),
  //   );
  // };

  return (
    // <ThemeContext.Provider value={{theme, toggleTheme, setSystemTheme}}>
    //   {children}
    // </ThemeContext.Provider>
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
