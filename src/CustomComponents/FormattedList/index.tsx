import React, {useState, useRef, useCallback} from 'react';
import {ScrollView, View, TouchableOpacity, Alert} from 'react-native';
import Space from '../../components/spacer/Space';
import {Row} from 'native-base';
import Heading from '../../components/Headings/Heading';
import SubHeading from '../../components/SubHeading/SubHeading';
import {CONS_COLOR, WHITE} from '../../styles/Colors';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {DilemmaType} from '../../services/ReduxToolkit/argumentSlice';
import {RootStackParamList} from '../../navigation/MainNavigation/MainNavigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {Swipeable} from 'react-native-gesture-handler';
import {MaterialIcons} from '../../utils/AppConstants';
import {useDispatch, useSelector} from 'react-redux';
import {
  DeleteFromArray,
  PermanentlyDeleteFromRemovedItems,
  RestoreToArray,
  ReduxStateType,
} from '../../services/ReduxToolkit/dataSlice';

type FormattedListNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProandCons'
>;

interface FormattedListProps {
  TopicList: DilemmaType[];
  arrayName: string;
}

const FormattedList: React.FC<FormattedListProps> = ({TopicList}) => {
  const navigation = useNavigation<FormattedListNavigationProp>();
  const dispatch = useDispatch();
  const removedItems = useSelector(
    (state: {data: ReduxStateType}) => state.data.removedItems,
  );

  const [currentSwipeable, setCurrentSwipeable] = useState<null | string>(null);
  const swipeableRefs = useRef<{[key: string]: Swipeable | null}>({});

  const handleItemPress = (selectedItem: DilemmaType) => {
    navigation.navigate('ProandCons', {selectedItem});
  };

  const RightSwip = (itemId: string) => {
    const isRemoved = removedItems.some(
      (item: DilemmaType) => item.id === itemId,
    );

    return (
      <TouchableOpacity
        style={{
          width: 40,
          height: 60,
          marginTop: 5,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {
          if (isRemoved) {
            dispatch(PermanentlyDeleteFromRemovedItems(itemId));
            Alert.alert('Topic Deleted', 'Your item is permanently deleted');
          } else {
            dispatch(DeleteFromArray(itemId));
          }
        }}>
        <MaterialIcons name={'delete'} color="black" size={32} />
      </TouchableOpacity>
    );
  };

  const LeftSwip = (itemId: string) => (
    <TouchableOpacity
      style={{
        width: 40,
        height: 60,
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => {
        dispatch(RestoreToArray(itemId));
      }}>
      <MaterialIcons name={'delete-forever'} color="black" size={32} />
    </TouchableOpacity>
  );

  const handleSwipeableOpen = useCallback(
    (itemId: string) => {
      if (currentSwipeable && currentSwipeable !== itemId) {
        swipeableRefs.current[currentSwipeable]?.close();
      }
      setCurrentSwipeable(itemId);
    },
    [currentSwipeable],
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (currentSwipeable) {
          swipeableRefs.current[currentSwipeable]?.close();
        }
      };
    }, [currentSwipeable]),
  );

  return (
    <ScrollView style={{flex: 1}}>
      <Space height={10} />
      {TopicList.map(item => {
        const isRemoved = removedItems.some(
          (removedItem: DilemmaType) => removedItem.id === item.id,
        );
        return (
          <Swipeable
            key={item.id}
            ref={ref => (swipeableRefs.current[item.id] = ref)}
            renderRightActions={() => RightSwip(item.id)}
            renderLeftActions={isRemoved ? () => LeftSwip(item.id) : undefined}
            onSwipeableWillOpen={() => handleSwipeableOpen(item.id)}>
            <View>
              <TouchableOpacity onPress={() => handleItemPress(item)}>
                <Row
                  style={{
                    borderWidth: 1,
                    borderColor: 'lightgray',
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: 'white',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
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
          </Swipeable>
        );
      })}
      <Space height={10} />
    </ScrollView>
  );
};

export default FormattedList;
