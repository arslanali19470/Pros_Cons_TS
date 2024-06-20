import React from 'react';
import {ScrollView, View, TouchableOpacity} from 'react-native';
import Space from '../../components/spacer/Space';
import {Row} from 'native-base';
import Heading from '../../components/Headings/Heading';
import SubHeading from '../../components/SubHeading/SubHeading';
import {CONS_COLOR, WHITE} from '../../styles/Colors';
import {useNavigation} from '@react-navigation/native';
import {DilemmaType} from '../../services/ReduxToolkit/dataSlice';
import {RootStackParamList} from '../../navigation/MainNavigation/MainNavigation';
import {StackNavigationProp} from '@react-navigation/stack';

type FormattedListNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProandCons'
>;

interface FormattedListProps {
  TopicList: DilemmaType[];
  arrayName: string;
}

const FormattedList: React.FC<FormattedListProps> = ({
  TopicList,
  arrayName,
}) => {
  const navigation = useNavigation<FormattedListNavigationProp>();

  const handleItemPress = (selectedItem: DilemmaType) => {
    navigation.navigate('ProandCons', {selectedItem});
  };

  return (
    <ScrollView style={{flex: 1}}>
      <Space height={10} />
      {TopicList.map(item => (
        <View key={item.id}>
          <TouchableOpacity onPress={() => handleItemPress(item)}>
            <Row
              style={{
                borderWidth: 1,
                borderColor: 'lightgray',
                padding: 10,
                borderRadius: 10,
              }}
              space={4}
              alignItems={'center'}
              width={'95%'}
              alignSelf={'center'}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: CONS_COLOR,
                  borderRadius: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Heading
                  text={item.TopicName.charAt(0)}
                  textAlign={'center'}
                  color={WHITE}
                />
              </View>
              <View>
                <Heading text={item.TopicName} />
                <Row space={3}>
                  <SubHeading text={item.ItemTime} />
                  <SubHeading text={item.ItemDate} />
                </Row>
              </View>
            </Row>
          </TouchableOpacity>
          <Space height={10} />
        </View>
      ))}
      <Space height={10} />
    </ScrollView>
  );
};

export default FormattedList;
