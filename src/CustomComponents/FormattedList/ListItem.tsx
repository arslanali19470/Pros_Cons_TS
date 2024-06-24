import React from 'react';
import {View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {Row} from 'native-base';
import {MaterialIcons} from '../../utils/AppConstants';
import Heading from '../../components/Headings/Heading';
import SubHeading from '../../components/SubHeading/SubHeading';
import {CONS_COLOR, WHITE} from '../../styles/Colors';
import {
  DeleteFromArray,
  PermanentlyDeleteFromRemovedItems,
  RestoreToArray,
} from '../../services/ReduxToolkit/dataSlice';
import Space from '../../components/spacer/Space';
import {DilemmaType} from '../../services/ReduxToolkit/argumentSlice';

interface ListItemProps {
  item: DilemmaType;
  isRemoved: boolean;
  setcurrentColor: React.Dispatch<React.SetStateAction<boolean>>;
  currentColor: boolean;
  handlePress: (itemId: string) => void;
  handleLongPress: (itemId: string) => void;
  handleSwipeableOpen: (itemId: string) => void;
  currentSwipeable: string | null;
  swipeableRefs: React.MutableRefObject<{[key: string]: Swipeable | null}>;
  dispatch: any;
  selectedItems: string[];
}
const ListItem: React.FC<ListItemProps> = ({
  item,
  isRemoved,
  handlePress,
  handleLongPress,
  handleSwipeableOpen,
  currentSwipeable,
  swipeableRefs,
  dispatch,
  selectedItems,
  setcurrentColor,
  currentColor,
}) => {
  const isSelected = currentColor && selectedItems.includes(item.id);
  const backgroundColor = isSelected ? 'lightgray' : WHITE;

  const RightSwip = (itemId: string) => (
    <TouchableOpacity
      style={styles.swipeButton}
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

  const LeftSwip = (itemId: string) => (
    <TouchableOpacity
      style={styles.swipeButton}
      onPress={() => {
        dispatch(RestoreToArray(itemId));
      }}>
      <MaterialIcons name={'delete-forever'} color="black" size={32} />
    </TouchableOpacity>
  );

  return (
    <Swipeable
      ref={ref => (swipeableRefs.current[item.id] = ref)}
      renderRightActions={() => RightSwip(item.id)}
      renderLeftActions={isRemoved ? () => LeftSwip(item.id) : undefined}
      onSwipeableWillOpen={() => handleSwipeableOpen(item.id)}>
      <View>
        <TouchableOpacity
          onPress={() => handlePress(item.id)}
          onLongPress={() => handleLongPress(item.id)}
          style={[styles.row, {backgroundColor}]}>
          <Row
            style={styles.rowContent}
            space={4}
            alignItems={'center'}
            width={'95%'}
            alignSelf={'center'}>
            <View style={[styles.circle, isSelected && styles.selectedCircle]}>
              <Heading
                text={isSelected ? '\u2713' : item.TopicName.charAt(0)}
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
};

const styles = StyleSheet.create({
  swipeButton: {
    width: 40,
    height: 60,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    backgroundColor: WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rowContent: {
    padding: 10,
  },
  circle: {
    width: 50,
    height: 50,
    backgroundColor: CONS_COLOR,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCircle: {
    backgroundColor: 'red', // Change background color to red when selected
  },
  selectedItem: {
    backgroundColor: 'lightgray', // Change background color to lightgray when selected
  },
});

export default ListItem;
