import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {
  multiThemeColor,
  normalized,
  normalizedFont,
} from '../../utils/AppConstants';
import {View} from 'native-base';
// import { BackButton } from "../../assets/Svg";
import {useStackNavigator} from '../../utils/HandleNavigation';
import Space from '../spacer/Space';

interface HeadingProps {
  text: string;
  textAlign?: TextStyle['textAlign'];
  color?: string;
  fontFamily?: string;
  weight?: TextStyle['fontWeight'];
  fontSize?: number;
  backBtn?: boolean;
  marginLeft?: number;
  marginTop?: number;
  style?: TextStyle;
  [key: string]: any; // Other props
}

const Heading: React.FC<HeadingProps> = ({
  text,
  textAlign,
  color,
  fontFamily,
  weight,
  fontSize,
  backBtn,
  marginLeft,
  marginTop,
  style, // Changed to accept style prop
  ...restProps // Other props
}) => {
  const {goBack} = useStackNavigator();
  return (
    <>
      {!backBtn && (
        <>
          <Text
            style={{
              textAlign: textAlign,
              fontSize: fontSize || normalizedFont.rf(2.5),
              fontWeight: weight,
              color: color || multiThemeColor().textcolor,
              fontFamily: fontFamily,
              marginLeft: marginLeft,
              marginTop: marginTop,
              ...style, // Spread style prop here
            }}
            {...restProps} // Spread other props
          >
            {text}
          </Text>
        </>
      )}
      {backBtn && (
        <View style={[styles.container]}>
          <TouchableOpacity onPress={() => goBack()}>
            {/* <BackButton /> */}
          </TouchableOpacity>
          <Text
            style={{
              textAlign: textAlign,
              fontSize: fontSize || normalizedFont.rf(2.5),
              fontWeight: weight,
              color: color || multiThemeColor().textcolor,
              fontFamily: fontFamily,
              paddingHorizontal: normalized.hp(3),
              marginLeft: marginLeft,
              marginTop: marginTop,
            }}>
            {text}
          </Text>
        </View>
      )}
    </>
  );
};
export default Heading;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
