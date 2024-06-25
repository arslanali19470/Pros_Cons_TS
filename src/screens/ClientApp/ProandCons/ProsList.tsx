import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
// import {CONS_COLOR} from '../../../styles/Colors';
import Heading from '../../../components/Headings/Heading';
import {Row} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../services/ReduxToolkit/store';
import {
  ArgumentType,
  DilemmaType,
} from '../../../services/ReduxToolkit/argumentSlice';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigation/MainNavigation/MainNavigation';
import {multiThemeColor} from '../../../utils/AppConstants';

interface ProsListProps {
  selectedItem: ArgumentType | DilemmaType;
}
type ArgumentNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Argument'
>;

const ProsList: React.FC<ProsListProps> = ({selectedItem}) => {
  const navigation = useNavigation<ArgumentNavigationProp>();
  const argumentArray = useSelector(
    (state: RootState) => state.argument.argumentArray,
  );

  const filteredProsArray = argumentArray.filter(
    (item: ArgumentType) =>
      item.type === '1' && item.TopicName === selectedItem.TopicName,
  );

  const handleProsDetails = (item: ArgumentType) => {
    navigation.navigate('Argument', {
      selectedItem: item,
      mode: 'update',
    });
  };

  return (
    <View style={{width: '70%', padding: 5, borderRadius: 5}}>
      {filteredProsArray.map((item, index) => (
        <TouchableOpacity onPress={() => handleProsDetails(item)} key={index}>
          <Row
            justifyItems="center"
            alignItems="center"
            space={2}
            style={[
              styles.circle,
              {backgroundColor: multiThemeColor().CONS_COLOR},
            ]}>
            <View style={styles.circle}>
              <Heading text="10" color="white" fontSize={15} />
            </View>
            <Heading text={item.description} fontSize={14} />
          </Row>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ProsList;

export const useFilteredProsArray = (
  selectedItem: ArgumentType | DilemmaType,
) => {
  const argumentArray = useSelector(
    (state: RootState) => state.argument.argumentArray,
  );
  return argumentArray.filter(
    (item: ArgumentType) =>
      item.type === '1' && item.TopicName === selectedItem.TopicName,
  );
};

const styles = StyleSheet.create({
  row: {
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 7,
    margin: 5,
    borderRadius: 5,
  },
  circle: {
    width: 30,
    height: 30,
    // backgroundColor: CONS_COLOR,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
