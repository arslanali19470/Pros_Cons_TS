// ProandCons.tsx
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Row, VStack} from 'native-base';
import {MaterialIcons, multiThemeColor} from '../../../utils/AppConstants';
import Heading from '../../../components/Headings/Heading';
import Space from '../../../components/spacer/Space';
import Gradiant_Button from '../../../components/Gradiant_Button/Gradiant_Button';
import Head_ProsCons from './Head_ProsCons';
import ProgressProsCons from './ProgressProsCons';
import ProsList, {useFilteredProsArray} from './ProsList';
import ConsList, {useFilteredConsArray} from './ConsList';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigation/MainNavigation/MainNavigation';
import {
  ArgumentType,
  DilemmaType,
} from '../../../services/ReduxToolkit/argumentSlice';

type ProsConsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProandCons'
>;

type ProsConsRouteProp = RouteProp<RootStackParamList, 'ProandCons'>;

export type ProsConsScreenProps = {
  navigation: ProsConsNavigationProp;
  route: ProsConsRouteProp;
};

const ProandCons: React.FC<ProsConsScreenProps> = ({route, navigation}) => {
  const selectedItem = route.params.selectedItem as ArgumentType | DilemmaType;

  const filteredProsArray = useFilteredProsArray(selectedItem);
  const filteredConsArray = useFilteredConsArray(selectedItem);

  const isEmpty =
    filteredProsArray.length === 0 && filteredConsArray.length === 0;

  return (
    <View style={{flex: 1, backgroundColor: multiThemeColor().main_background}}>
      <Head_ProsCons selectedItem={selectedItem as DilemmaType} />
      <ProgressProsCons />
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        {isEmpty ? (
          <View>
            <Space height={140} />
            <MaterialIcons
              name="source"
              size={150}
              color="lightgray"
              style={{alignSelf: 'center'}}
            />
            <Heading
              text="there is no argument, yet"
              color="lightgray"
              textAlign="center"
            />
            <Space height={50} />
          </View>
        ) : (
          <View>
            <Heading text="Pros" style={{padding: 20}} />
            <Row style={styles.row}>
              <ProsList selectedItem={selectedItem} />
              <ConsList selectedItem={selectedItem} />
            </Row>
          </View>
        )}

        <Space height={40} />
        <Gradiant_Button
          title="ADD ARGUMENT"
          onPress={() =>
            navigation.navigate('Argument', {
              selectedItem,
              mode: 'add',
            })
          }
          color="white"
          alignSelf="flex-end"
          marginRight={20}
          marginBottom={20}
          width="120%"
          fontSize={13}
        />
      </View>
    </View>
  );
};

export default ProandCons;

const styles = StyleSheet.create({
  row: {
    borderWidth: 1,
    borderColor: 'lightgray',
    width: '100%',
    padding: 5,
  },
});
