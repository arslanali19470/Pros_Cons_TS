import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, TextInput, View, Alert} from 'react-native';
import Slider from '@react-native-community/slider';
import Space from '../../../components/spacer/Space';
import CircularBorder from '../../../components/CircularBorder/CircularBorder';
import Heading from '../../../components/Headings/Heading';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import GradientButton from '../../../components/Gradiant_Button/Gradiant_Button';
// import {BLUE1, BLUE2} from '../../../styles/Colors';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Argument_Add_Array,
  Argument_Update_Array,
  ArgumentType,
} from '../../../services/ReduxToolkit/argumentSlice';
import uuid from 'react-native-uuid';

import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigation/MainNavigation/MainNavigation';
import {RootState} from '../../../services/ReduxToolkit/store';
import {multiThemeColor} from '../../../utils/AppConstants';

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
  const navigation = useNavigation<ArgumentNavigationProp>();
  const dispatch = useDispatch();
  const argumentArray = useSelector(
    (state: RootState) => state.argument.argumentArray,
  );

  const selectedItem: ArgumentType | undefined = route?.params?.selectedItem;
  const {mode} = route.params;
  const isUpdateMode = mode === 'update';

  useEffect(() => {
    if (selectedItem) {
      setTextInput(selectedItem.description || '');
      setSliderValue(selectedItem.importance || 0);
      setSelectedId(selectedItem.type || undefined);
    }
  }, [selectedItem]);

  const handleSliderChange = (value: number) => {
    const roundedValue = Math.round(value);
    setSliderValue(roundedValue);
  };

  const handleTextInputChange = (text: string) => {
    setTextInput(text);
  };

  const handleRadioButtonChange = (id: string) => {
    setSelectedId(id);
  };

  const validateInput = (
    description: string,
    importance: number,
    type: string | undefined,
  ) => {
    const trimmedDescription = description.trim();
    if (!trimmedDescription || trimmedDescription.split(' ').length < 1) {
      Alert.alert(
        'Invalid Description',
        'Description must be at least 1 word.',
      );
      return false;
    }
    if (!importance) {
      Alert.alert('Invalid Importance', 'Please select an importance level.');
      return false;
    }
    if (!type || (type !== '1' && type !== '2')) {
      Alert.alert('Invalid Type', 'Please select a valid type.');
      return false;
    }
    const isDuplicate = argumentArray.some(item =>
      isUpdateMode
        ? item.description === trimmedDescription &&
          item.id !== selectedItem?.id
        : item.description === trimmedDescription,
    );
    if (isDuplicate) {
      Alert.alert('Duplicate Description', 'The description already exists.');
      return false;
    }
    return true;
  };

  const dispatchUpdate = (
    id: string,
    description: string,
    importance: number,
    type: string | undefined,
  ) => {
    if (!validateInput(description, importance, type)) {
      return;
    }
    dispatch(
      Argument_Update_Array({
        id,
        description: description.trim(),
        importance,
        type: type || '',
        TopicName: selectedItem?.TopicName || '',
      }),
    );
    navigation.goBack();
  };

  const addProsConsList = () => {
    if (!validateInput(textInput, sliderValue, selectedId)) {
      return;
    }
    const newItem: ArgumentType = {
      id: uuid.v4() as string,
      description: textInput.trim(),
      importance: sliderValue,
      type: selectedId || '',
      TopicName: selectedItem?.TopicName || '',
    };

    dispatch(Argument_Add_Array(newItem));
    navigation.goBack();
  };

  const UpdateProsConsList = () => {
    if (selectedItem) {
      dispatchUpdate(selectedItem.id, textInput, sliderValue, selectedId);
    }
  };

  const BoderColor = multiThemeColor().textcolor;

  const radioButtons = useMemo<RadioButtonProps[]>(
    () => [
      {
        id: '1',
        label: 'Pros',
        value: 'Pros',
        borderColor: BoderColor, // Change border color here
        color: BoderColor, // Change inner dot color here
      },
      {
        id: '2',
        label: 'Cons',
        value: 'Cons',
        borderColor: BoderColor, // Change border color here
        color: BoderColor, // Change inner dot color here
      },
    ],
    [],
  );

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
        backgroundColor: multiThemeColor().main_background,
      }}>
      <View>
        <Space height={30} />
        <TextInput
          multiline={true}
          numberOfLines={10}
          style={[
            styles.textInput,
            {
              borderColor: multiThemeColor().BLUE1,
              color: multiThemeColor().textcolor,
            },
          ]}
          placeholder="Description"
          placeholderTextColor={'gray'}
          value={textInput}
          onChangeText={handleTextInputChange}
        />
        <Space height={30} />
        <CircularBorder
          b_color={multiThemeColor().BLUE1}
          style={{alignSelf: 'center'}}>
          <Heading text={String(sliderValue)} />
        </CircularBorder>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10}
          minimumTrackTintColor={multiThemeColor().BLUE2}
          maximumTrackTintColor={multiThemeColor().BLUE1}
          value={sliderValue}
          onValueChange={handleSliderChange}
        />
        <Heading text={'Importance'} textAlign={'center'} />
        <Space height={20} />
        <View style={{alignSelf: 'flex-start', marginLeft: 10}}>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={handleRadioButtonChange}
            selectedId={selectedId}
            labelStyle={{color: multiThemeColor().textcolor}} // Changed the label color here
          />
        </View>
      </View>
      {isUpdateMode ? (
        <GradientButton
          title={'Update'}
          color={'white'}
          alignSelf="flex-end"
          marginRight={20}
          marginBottom={20}
          width={'120%'}
          fontSize={13}
          onPress={UpdateProsConsList}
        />
      ) : (
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
      )}
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
    // borderColor: BLUE1,
    width: '90%',
    alignSelf: 'center',
    fontSize: 18,
    borderRadius: 5,
    padding: 10,
  },
});

export default AddArgument;
