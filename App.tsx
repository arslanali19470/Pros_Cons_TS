import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

// import HomeScreen from './src/screens/HomeScreen';
// import DetailsScreen from './src/screens/DetailsScreen';
import MainNavigation from './src/navigation/MainNavigation/MainNavigation';
import {NativeBaseProvider} from 'native-base';
import {ThemeProvider} from './src/utils/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <NativeBaseProvider>
          <MainNavigation />
        </NativeBaseProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
