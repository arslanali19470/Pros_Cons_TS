// ConsList.tsx
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
// import {PROS_COLOR} from '../../../styles/Colors';
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

interface ConsListProps {
  selectedItem: ArgumentType | DilemmaType;
}

type ArgumentNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Argument'
>;

const ConsList: React.FC<ConsListProps> = ({selectedItem}) => {
  const navigation = useNavigation<ArgumentNavigationProp>();
  const argumentArray = useSelector(
    (state: RootState) => state.argument.argumentArray,
  );

  const filteredConsArray = argumentArray.filter(
    (item: ArgumentType) =>
      item.type === '2' && item.TopicName === selectedItem?.TopicName,
  );

  const handleConsDetails = (item: ArgumentType) => {
    navigation.navigate('Argument', {
      selectedItem: item,
      mode: 'update',
    });
  };

  return (
    <View style={{width: '70%', padding: 5, borderRadius: 5}}>
      {filteredConsArray.map((item, index) => (
        <TouchableOpacity onPress={() => handleConsDetails(item)} key={index}>
          <Row
            justifyItems="center"
            alignItems="center"
            space={2}
            style={styles.row}>
            <View
              style={[
                styles.circle,
                {backgroundColor: multiThemeColor().PROS_COLOR},
              ]}>
              <Heading text="10" color="white" fontSize={15} />
            </View>
            <Heading text={item.description} fontSize={14} />
          </Row>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ConsList;

export const useFilteredConsArray = (
  selectedItem: ArgumentType | DilemmaType,
) => {
  const argumentArray = useSelector(
    (state: RootState) => state.argument.argumentArray,
  );
  return argumentArray.filter(
    (item: ArgumentType) =>
      item.type === '2' && item.TopicName === selectedItem?.TopicName,
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
    // backgroundColor: PROS_COLOR,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
