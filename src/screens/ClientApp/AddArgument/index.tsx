import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Slider from '@react-native-community/slider';
import Space from '../../../components/spacer/Space';
import CircularBorder from '../../../components/CircularBorder/CircularBorder';
import Heading from '../../../components/Headings/Heading';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import GradientButton from '../../../components/Gradiant_Button/Gradiant_Button';
import {BLUE1, BLUE2} from '../../../styles/Colors';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
// import {AddArgument} from '../../../services/ReduxToolkit/argumentSlice';
import {Argument_Add_Array} from '../../../services/ReduxToolkit/argumentSlice';
import uuid from 'react-native-uuid';

import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigation/MainNavigation/MainNavigation';

type ArgumentNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Argument'
>;
type ArgumentRouteProp = RouteProp<RootStackParamList, 'Argument'>;

export type ArgumentScreenProps = {
  navigation: ArgumentNavigationProp;
  route: ArgumentRouteProp;
};

const AddArgument: React.FC<ArgumentScreenProps> = ({route}) => {
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [textInput, setTextInput] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const selectedItem = route?.params?.selectedItem;

  useEffect(() => {
    if (selectedItem) {
      setTextInput(selectedItem.description || ''); // Set TextInput value
      setSliderValue(selectedItem.importance || 0); // Set Slider value
      setSelectedId(selectedItem.type || undefined); // Set Radio button value
    }
  }, [selectedItem]);

  const handleSliderChange = (value: number) => {
    const roundedValue = Math.round(value);
    setSliderValue(roundedValue);
  };

  const radioButtons = useMemo<RadioButtonProps[]>(
    () => [
      {
        id: '1',
        label: 'Pros',
        value: 'Pros',
      },
      {
        id: '2',
        label: 'Cons',
        value: 'Cons',
      },
    ],
    [],
  );

  const addProsConsList = () => {
    const newItem = {
      id: uuid.v4() as string,
      description: textInput,
      importance: sliderValue,
      type: selectedId || '',
      TopicName: selectedItem?.TopicName || '', // Include TopicName
    };

    dispatch(Argument_Add_Array(newItem));
    navigation.goBack();
  };

  return (
    <View style={{flex: 1, padding: 10, justifyContent: 'space-between'}}>
      <View>
        <Space height={30} />
        <TextInput
          multiline={true}
          numberOfLines={10}
          style={styles.textInput}
          placeholder="Description"
          placeholderTextColor={'gray'}
          value={textInput}
          onChangeText={setTextInput}
        />
        <Space height={30} />
        <CircularBorder b_color={BLUE1} style={{alignSelf: 'center'}}>
          <Heading text={String(sliderValue)} />
        </CircularBorder>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10}
          minimumTrackTintColor={BLUE2}
          maximumTrackTintColor={BLUE1}
          value={sliderValue}
          onValueChange={handleSliderChange}
        />
        <Heading text={'Importance'} textAlign={'center'} />
        <Space height={20} />
        <View style={{alignSelf: 'flex-start', marginLeft: 10}}>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={setSelectedId}
            selectedId={selectedId}
            // borderColor="red"
            // color="red"
            // selectedButtonStyle={{backgroundColor: 'red'}}
            // buttonContainerStyle={{borderColor: 'red'}}
            labelStyle={{color: 'black'}}
          />
        </View>
      </View>
      <GradientButton
        title={'SAVE'}
        color={'white'}
        alignSelf="flex-end"
        marginRight={20}
        marginBottom={20}
        width={'120%'}
        fontSize={13}
        onPress={addProsConsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    width: 300,
    height: 40,
    marginTop: 20,
    alignSelf: 'center',
  },
  textInput: {
    height: 80,
    textAlignVertical: 'top',
    borderWidth: 2,
    borderColor: BLUE1,
    width: '90%',
    alignSelf: 'center',
    fontSize: 18,
    borderRadius: 5,
    padding: 10,
  },
});

export default AddArgument;
