import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Space from '../../../components/spacer/Space';
// import {useNavigation, NavigationProp} from '@react-navigation/native';
// import FormattedList from '../../../CustomComponents/FormattedList';
import {LinearGradient, MaterialIcons} from '../../../utils/AppConstants';
import {DrawerNavigationProp} from '@react-navigation/drawer';
// import {RootStackParamList} from '../StackNavigation/DrawerNavigation';
import {DrawerParamList} from '../../../navigation/Drawer_Navigation/DrawerNavigation';
import {RouteProp} from '@react-navigation/native';
import FormattedList from '../../../CustomComponents/FormattedList';
import {useSelector} from 'react-redux';
import {RootState} from '../../../services/ReduxToolkit/store';

// DrawerParamList

type DrawerScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  'Dilemmas'
>;
type DrawerScreenRouteProp = RouteProp<DrawerParamList, 'Dilemmas'>;

export type DrawerScreenProps = {
  navigation: DrawerScreenNavigationProp;
  route: DrawerScreenRouteProp;
};

const Home_Dilemmas: React.FC<DrawerScreenProps> = ({navigation}) => {
  const FirstArray = useSelector((state: RootState) => state.data.array1);
  return (
    <View style={{flex: 1}}>
      <Space height={10} />
      <FormattedList TopicList={FirstArray} arrayName="FirstArray" />
      <TouchableOpacity
        onPress={() => navigation.navigate('Dilemmas Description')}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#4976e8', '#26c4f5', '#4ce4fc']}
          style={styles.CircularButton}>
          <MaterialIcons name={'mode-edit'} color="white" size={32} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default Home_Dilemmas;

const styles = StyleSheet.create({
  CircularButton: {
    height: 60,
    width: 60,
    borderRadius: 100,
    position: 'absolute',
    bottom: 50,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
