import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import {
  useNavigation,
  RouteProp,
  DrawerActions,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import Home_Dilemmas from '../../screens/ClientApp/Home_Dilemmas';
import Trash from '../../screens/ClientApp/Trash';
import CustomDrawerContent from '../../components/CustomDrawerContent/CustomDrawerContent';
import HeaderLeft from '../../components/HeaderLeft/HeaderLeft';
import Settings from '../../screens/ClientApp/Settings/Index';
import ProFeatcher from '../../screens/ClientApp/ProFeatcher';
import {BLUE2, GRAY} from '../../styles/Colors';
import {BarIcon, TrashIcon, SettingsIcon, CartIcon} from '../../utils/Icons';
import {MaterialIcons} from '../../utils/AppConstants';
import {RootStackParamList} from '../MainNavigation/MainNavigation';

// Type definitions for navigation and route
type DrawerScreenNavigationProp = DrawerNavigationProp<
  RootStackParamList,
  'DrawerNavigation'
>;
type DrawerScreenRouteProp = RouteProp<RootStackParamList, 'DrawerNavigation'>;

export type DrawerScreenProps = {
  navigation: DrawerScreenNavigationProp;
  route: DrawerScreenRouteProp;
};

// Define the type for DrawerParamList
export type DrawerParamList = {
  Dilemmas: undefined;
  Trash: undefined;
  Settings: undefined;
  'Pro Features': undefined;
  SearchHome: undefined;
  'Dilemmas Description': undefined;
};

// Create the Drawer Navigator
const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigation: React.FC<DrawerScreenProps> = () => {
  // Use navigation hook with correct type
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: 'white',
        drawerActiveBackgroundColor: BLUE2,
        drawerStyle: {},
        drawerPosition: 'left',
        headerStyle: {
          backgroundColor: GRAY,
        },
        drawerType: 'back',
        headerShadowVisible: false,
        headerTitle: '',
        headerLeft: () => (
          <HeaderLeft
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        ),
        headerRight: () => (
          <TouchableOpacity
            style={{marginRight: 20}}
            onPress={() => navigation.navigate('SearchHome')}>
            <MaterialIcons name="search" size={25} color="white" />
          </TouchableOpacity>
        ),
      }}
      initialRouteName="Dilemmas">
      <Drawer.Screen
        name="Dilemmas"
        component={Home_Dilemmas}
        options={{
          drawerIcon: ({color}) => <BarIcon color={color} />,
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Trash"
        component={Trash}
        options={{
          drawerIcon: ({color}) => <TrashIcon color={color} />,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({color}) => <SettingsIcon color={color} />,
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Pro Features"
        component={ProFeatcher}
        options={{
          drawerIcon: ({color}) => <CartIcon color={color} />,
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
