import React from 'react';
import { StyleSheet, View } from 'react-native';
import Picture from '../Picture/Picture';
import { NavImage2 } from '../../assets';
import { normalized } from '../../utils/AppConstants';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  return (
    <DrawerContentScrollView {...props} style={styles.imageResize}>
      <Picture
        localSource={NavImage2}
        height={normalized.wp('40%')}
        width={normalized.wp('100%')}
        resizeMode="repeat"
      />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  itemList: { alignItems: 'flex-start', justifyContent: 'center' },
  imageResize: { marginTop: -4 }
});
