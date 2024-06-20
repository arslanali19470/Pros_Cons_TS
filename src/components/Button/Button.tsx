import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle, TextStyle } from 'react-native';
import { AppColors, normalized } from '../../utils/AppConstants';
import Picture from '../Picture/Picture';
import { WHITE } from '../../styles/Colors';
// import { plus } from '../../assets';

interface ButtonProps {
  height?: number | string;
  width?: number | string;
  onPress: () => void;
  alignSelf?: ViewStyle['alignSelf'];
  style?: ViewStyle;
  title: string;
  backgroundColor?: string;
  absolute?: boolean;
  absoluteRed?: boolean;
  TextColor?: string;
  leftIcon?: boolean;
  fontWeight?: TextStyle['fontWeight'];
  txtmarginLeft?: number;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  height,
  width,
  onPress,
  alignSelf,
  style,
  title,
  backgroundColor,
  absolute,
  absoluteRed,
  TextColor,
  leftIcon,
  fontWeight,
  txtmarginLeft,
  disabled
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        style,
        {
          height: height || normalized.hp('5.2%'),
          width: width || normalized.wp('90%'),
          borderRadius: 4,
          alignSelf: alignSelf || 'center',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor:
            backgroundColor || "red",
        },
        (absolute || absoluteRed)
          ? { position: 'absolute', bottom: absoluteRed ? normalized.hp(7) : 0 }
          : {},
      ]}
      onPress={onPress}>
      {leftIcon && (
        <View style={styles.Button}>
          {/* <Picture
            localSource={plus}
            alignSelf={'flex-start'}
            height={normalized.hp('1.5%')}
            width={normalized.hp('1.5%')}
          /> */}
        </View>
      )}

      <Text
        style={{
          color: TextColor || WHITE,
          fontWeight: fontWeight || 'bold',
          marginLeft: txtmarginLeft || 0,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  Button: {
    position: 'absolute',
    left: normalized.wp(2),
  },
});
