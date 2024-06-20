import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFPercentage as rf } from 'react-native-responsive-fontsize';
import { Dimensions, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';

export const dimensionized = { SCREEN_WIDTH, SCREEN_HEIGHT };
export const normalized = { hp, wp };
export const normalizedFont = { rf };
export const AppFonts = {
  commonFont: {
    smallest: rf(1.5),
    small: rf(2),
    medium: rf(2.5),
    large: rf(3),
    mediumLarge: rf(4),
    extraLarge: rf(5),
  },
};
export const AppIcons = {
  commonIcons: {
    smallest: 18,
    small: 20,
    medium: 24,
    large: 28,
    extraLarge: 30,
  },
};

export const multiThemeColor = () => {
  const { theme } = useContext(ThemeContext) || 'light';

  if (theme == 'light') {
    return {
      // main_background: '#FFFFFF',
      // primary_color: '#6315FF',
      // secondary_color: '#ECE3FD',
      // third_color: '#7B3DB3',
      // dark_gray: '#434343',
      // light1_gray: '#A5A5A9',
      // light2_gray: '#EBEBEB',
      // online_color: '#43A721',
      // red: 'red',
      // blue: 'blue',
      // white: '#fff',
      // black: '#000',
      // defaultBackGround: '#f4f8f8',
      // textcolor: '#000',
    };
  } else {
    return {
      // main_background: '#2F3E46',
      // primary_color: '#7B3DB3',
      // secondary_color: '#ECE3FD',
      // third_color: '#7B3DB3', //#7B3DB3
      // dark_gray: '#FFFFFF',
      // light1_gray: '#EBEBEB',
      // light2_gray: '#EBEBEB',
      // online_color: '#43A721',
      // red: 'red',
      // blue: 'blue',
      // white: '#000',
      // black: '#fff',
      // defaultBackGround: '#000',
      // textcolor: '#fff',
    };
  }
};

export const commonStyleSheet = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignSelf: {
    alignSelf: 'center',
  },
});

export const AppColors = {
  // primaryColor: {
  //   darkBlack: '#000000',
  //   darkWhite: '#FFFFFF',
  //   mainContent: '#0CBA6F',
  //   main_background: '#2F3E46',
  //   gradient: ['#0cba6f', '#484749'],
  //   lightContent: 'rgba(12, 186, 111, 0.4)',
  // },
  // secondaryColor: {
  //   darkGray: '#1f1e1e',
  //   lightGray: '#545275',
  //   shadedBlack: '#364257',
  //   red: 'red',
  //   placeHolderCol: '#7587A6',
  //   darkBlue: '#3083FF',
  //   PeachyPink: '#EFCAD1',
  //   darkPink: '#EFCAD1',
  //   darkPurple: '#76243F',
  //   SlateGray: '#524e4e',
  //   pureWhite: 'white',
  //   mainWhite: ['#FFFFFF', '#FFFFFF'],
  //   lightMode: ['#F9E6D7', '#FEF9F3'],
  //   darkMode: ['#76243F', '#0D0A2D'],
  //   mainApp: ['#1fbe73', '#46785f'],
  //   whiteGradient: ['#c6ccc8', '#dae0db'],
  //   mainBlue: ['#3083FF', '#3083FF'],
  //   mainPink: ['#eb23a8', '#eb23a8'],
  //   lightPink: '#faded9',
  //   transparentRed: 'rgba(255, 0, 0, 0.5)',
  // },
  // radiantColor: {
  //   darkBlue: '#0551BF',
  //   white: '#FFFFFF',
  //   lightBlue: '#CADEFF',
  // },
  // errorColor: {
  //   red: '#f44336',
  // },
};
export {
  AntDesign,
  Feather,
  FontAwesome5,
  FontAwesome,
  MaterialIcons,
  EvilIcons,
  SimpleLineIcons,
  MaterialCommunityIcons,
  Entypo,
  Fontisto,
  Ionicons,
};
export {
  LinearGradient
}
export {
  Modal
}
