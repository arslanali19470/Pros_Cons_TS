// MainNavigation.tsx
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import DrawerNavigation from '../Drawer_Navigation/DrawerNavigation';
import AddDilemmas from '../../screens/ClientApp/AddDilemmas';
import SearchHome from '../../screens/ClientApp/Search_Home';
import ProandCons from '../../screens/ClientApp/ProandCons';
import AddArgument from '../../screens/ClientApp/AddArgument';
import {BLACK, GRAY, WHITE} from '../../styles/Colors';
import {
  DilemmaType,
  ArgumentType,
} from '../../services/ReduxToolkit/argumentSlice';

export type RootStackParamList = {
  DrawerNavigation: undefined;
  SearchHome: undefined;
  ProandCons: {selectedItem: DilemmaType};
  'Dilemmas Description': {selectedItem: ArgumentType | DilemmaType};
  Argument: {selectedItem: ArgumentType | DilemmaType; mode: 'add' | 'update'};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigation: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);

  return (
    <>
      <StatusBar
        barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkTheme ? BLACK : WHITE}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
        <Stack.Screen
          name="Dilemmas Description"
          component={AddDilemmas}
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: GRAY},
            headerTintColor: WHITE,
          }}
        />
        <Stack.Screen
          name="SearchHome"
          component={SearchHome}
          options={{
            headerShown: false,
            headerStyle: {backgroundColor: GRAY},
            headerTintColor: WHITE,
          }}
        />
        <Stack.Screen
          name="ProandCons"
          component={ProandCons}
          options={{
            headerShown: false,
            headerStyle: {backgroundColor: GRAY},
            headerTintColor: WHITE,
          }}
        />
        <Stack.Screen
          name="Argument"
          component={AddArgument}
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: GRAY},
            headerTintColor: WHITE,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default MainNavigation;
