import React, {useState, useEffect} from 'react';
import {View, TextInput, Alert} from 'react-native';
import {VStack} from 'native-base';
import Gradiant_Button from '../../../components/Gradiant_Button/Gradiant_Button';
import {BLUE1} from '../../../styles/Colors';
import Space from '../../../components/spacer/Space';
import {useDispatch, useSelector} from 'react-redux';
import {
  PushToArray,
  UpdateArrayItem,
} from '../../../services/ReduxToolkit/dataSlice';
import uuid from 'react-native-uuid';
import {RouteProp, useIsFocused} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigation/MainNavigation/MainNavigation';
import {DilemmaType} from '../../../services/ReduxToolkit/dataSlice';
import {RootState} from '../../../services/ReduxToolkit/store';

type AddDilemmasNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Dilemmas Description'
>;
type AddDilemmasRouteProp = RouteProp<
  RootStackParamList,
  'Dilemmas Description'
>;

export type AddDilemmasScreenProps = {
  navigation: AddDilemmasNavigationProp;
  route: AddDilemmasRouteProp;
};

const Add_Dilemmas: React.FC<AddDilemmasScreenProps> = ({
  route,
  navigation,
}) => {
  const selectedItem = route?.params?.selectedItem;
  const isFocused = useIsFocused();

  const [inputValue, setInputValue] = useState<string>(
    selectedItem?.TopicName || '',
  );
  const [textHeight, setTextHeight] = useState(150);
  const dispatch = useDispatch();
  const dilemmas = useSelector((state: RootState) => state.data.array1);
  const updated = useSelector((state: RootState) => state.data.updated);

  useEffect(() => {
    if (selectedItem) {
      const updatedItem =
        dilemmas.find(item => item.id === selectedItem.id) ||
        updated.find(item => item.id === selectedItem.id);
      if (updatedItem) {
        setInputValue(updatedItem.TopicName);
      }
    }
  }, [isFocused, selectedItem, dilemmas, updated]);

  const getCurrentDateTime = () => {
    const currentDateTime = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    const currentDate = currentDateTime.toLocaleDateString('en-US', options);
    const currentTime = currentDateTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
    return {ItemDate: currentDate, ItemTime: currentTime};
  };

  const handleAddItem = () => {
    const trimmedInputValue = inputValue.trim();

    if (trimmedInputValue === '') {
      Alert.alert('Error', 'Description cannot be empty.');
      return;
    }

    const isTopicNameExists = dilemmas.some(
      dilemma =>
        dilemma.TopicName.toLowerCase() === trimmedInputValue.toLowerCase(),
    );

    const isUpdatedTopicNameExists = updated.some(
      dilemma =>
        dilemma.TopicName.toLowerCase() === trimmedInputValue.toLowerCase(),
    );

    if (isTopicNameExists || isUpdatedTopicNameExists) {
      Alert.alert('Error', 'Topic name already exists.');
      return;
    }

    if (selectedItem) {
      // Update existing item
      dispatch(
        UpdateArrayItem({id: selectedItem.id, TopicName: trimmedInputValue}),
      );
    } else {
      // Add new item
      const {ItemDate, ItemTime} = getCurrentDateTime();
      const newItem: DilemmaType = {
        id: uuid.v4() as string,
        TopicName: trimmedInputValue,
        ItemDate: ItemDate,
        ItemTime: ItemTime,
      };

      dispatch(PushToArray(newItem));
    }

    // Optionally, navigate back or give user feedback
    navigation.goBack();
  };

  return (
    <View style={{flex: 1}}>
      <Space height={20} />
      <VStack justifyContent="space-between" style={{flex: 1}}>
        <TextInput
          multiline
          numberOfLines={10}
          style={{
            minHeight: 150,
            maxHeight: 400,
            height: textHeight,
            textAlignVertical: 'top',
            borderWidth: 2,
            borderColor: BLUE1,
            width: '90%',
            alignSelf: 'center',
            fontSize: 18,
            borderRadius: 10,
            padding: 10,
          }}
          placeholder="Description"
          placeholderTextColor="gray"
          value={inputValue}
          onChangeText={setInputValue}
          onContentSizeChange={event => {
            const newHeight = Math.min(
              400,
              Math.max(150, event.nativeEvent.contentSize.height),
            );
            setTextHeight(newHeight);
          }}
        />
      </VStack>

      <Gradiant_Button
        title={'Save'}
        onPress={handleAddItem}
        color={'white'}
        alignSelf="flex-end"
        marginRight={20}
        marginBottom={20}
        width={'120%'}
        fontSize={13}
      />
    </View>
  );
};

export default Add_Dilemmas;
