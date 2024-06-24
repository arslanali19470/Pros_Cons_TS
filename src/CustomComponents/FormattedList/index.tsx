import React, {useState, useRef, useEffect} from 'react';
import {ScrollView, BackHandler, ToastAndroid} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {Swipeable} from 'react-native-gesture-handler';
import {RootStackParamList} from '../../navigation/MainNavigation/MainNavigation';
import {ReduxStateType} from '../../services/ReduxToolkit/dataSlice';
import ListItem from './ListItem';
import {DilemmaType} from '../../services/ReduxToolkit/argumentSlice';

type FormattedListNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProandCons'
>;

interface FormattedListProps {
  TopicList: DilemmaType[];
  arrayName: string;
  setSelectedCount: (count: number) => void;
  setSelectedItems: (items: string[]) => void;
  resetSelection: boolean;
  setResetSelection: (reset: boolean) => void;
  updateSelection: (items: string[]) => void; // New prop
}

const FormattedList: React.FC<FormattedListProps> = ({
  TopicList,
  arrayName,
  setSelectedCount,
  setSelectedItems,
  resetSelection,
  setResetSelection,
}) => {
  const navigation = useNavigation<FormattedListNavigationProp>();
  const dispatch = useDispatch();
  const removedItems = useSelector(
    (state: {data: ReduxStateType}) => state.data.removedItems,
  );

  const [currentSwipeable, setCurrentSwipeable] = useState<null | string>(null);
  const [currentColor, setcurrentColor] = useState<boolean>(true); // Ensure it's a boolean
  const swipeableRefs = useRef<{[key: string]: Swipeable | null}>({});

  const [selectedItems, setSelected] = useState<string[]>([]);
  const [isInitialLongPressDone, setIsInitialLongPressDone] = useState(false);
  const backPressCounter = useRef(0);
  const backPressTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (resetSelection) {
      setSelected([]);
      setSelectedCount(0);
      setIsInitialLongPressDone(false);
      setResetSelection(false); // Reset the flag after processing
    }
  }, [resetSelection, setResetSelection, setSelectedCount]);

  useFocusEffect(
    React.useCallback(() => {
      // Reset selection when screen loses focus
      setSelected([]);
      setSelectedCount(0);
      setIsInitialLongPressDone(false);
    }, [setSelectedCount]),
  );

  useEffect(() => {
    const backAction = () => {
      setcurrentColor(false);
      if (selectedItems.length > 0) {
        // Deselect all items when back button is pressed
        setSelectedItems([]);
        setSelectedCount(0);
        setIsInitialLongPressDone(false);
        ToastAndroid.show('Selection cleared', ToastAndroid.SHORT);
        return true;
      } else {
        // If no items are selected, handle back press normally
        if (backPressCounter.current === 0) {
          ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
          backPressCounter.current += 1;

          backPressTimeout.current = setTimeout(() => {
            backPressCounter.current = 0;
          }, 2000);

          return true;
        } else {
          if (backPressTimeout.current) {
            clearTimeout(backPressTimeout.current);
          }
          BackHandler.exitApp();
          return true;
        }
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      if (backPressTimeout.current) {
        clearTimeout(backPressTimeout.current);
      }
      backHandler.remove();
    };
  }, [selectedItems, setSelectedCount]);

  const handleLongPress = (itemId: string) => {
    if (!isInitialLongPressDone) {
      const newSelectedItems = selectedItems.includes(itemId)
        ? selectedItems.filter(i => i !== itemId)
        : [...selectedItems, itemId];
      setSelected(newSelectedItems);
      setSelectedItems(newSelectedItems);
      setSelectedCount(newSelectedItems.length);
      setIsInitialLongPressDone(true);
      setcurrentColor(true);
    }
  };

  const handlePress = (itemId: string) => {
    if (isInitialLongPressDone) {
      const newSelectedItems = selectedItems.includes(itemId)
        ? selectedItems.filter(i => i !== itemId)
        : [...selectedItems, itemId];
      setSelected(newSelectedItems);
      setSelectedItems(newSelectedItems);
      setSelectedCount(newSelectedItems.length);
      setcurrentColor(true);
    } else {
      const selectedItem = TopicList.find(item => item.id === itemId);
      if (selectedItem) {
        navigation.navigate('ProandCons', {selectedItem});
      }
    }
  };

  const handleSwipeableOpen = (itemId: string) => {
    if (
      currentSwipeable &&
      currentSwipeable !== itemId &&
      swipeableRefs.current[currentSwipeable]
    ) {
      swipeableRefs.current[currentSwipeable]?.close();
    }
    setCurrentSwipeable(itemId);
  };

  return (
    <ScrollView style={{padding: 10}}>
      {TopicList.map(item => (
        <ListItem
          key={item.id}
          item={item}
          isRemoved={removedItems.some(i => i.id === item.id)}
          handlePress={handlePress}
          handleLongPress={handleLongPress}
          handleSwipeableOpen={handleSwipeableOpen}
          currentSwipeable={currentSwipeable}
          swipeableRefs={swipeableRefs}
          dispatch={dispatch}
          selectedItems={selectedItems}
          setcurrentColor={setcurrentColor} // Pass the setter function
          currentColor={currentColor} // Pass the boolean value
        />
      ))}
    </ScrollView>
  );
};

export default FormattedList;
