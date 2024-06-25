import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Row} from 'native-base';
import {
  Ionicons,
  MaterialIcons,
  multiThemeColor,
} from '../../../utils/AppConstants';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../services/ReduxToolkit/store';
import {DilemmaType} from '../../../services/ReduxToolkit/argumentSlice';
// import {GRAY, WHITE} from '../../../styles/Colors';
import FormattedList from '../../../CustomComponents/FormattedList';

const SearchHome = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<DilemmaType[]>([]);
  const FirstArray = useSelector((state: RootState) => state.data.array1);

  const [selectedItemCount, setSelectedItemCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [resetSelection, setResetSelection] = useState(false);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredItems([]);
    } else {
      setFilteredItems(
        FirstArray.filter(item =>
          item.TopicName.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
    }
  }, [searchQuery, FirstArray]);

  return (
    <View style={{flex: 1, backgroundColor: multiThemeColor().main_background}}>
      <Row
        style={{backgroundColor: multiThemeColor().GRAY, padding: 10}}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="keyboard-backspace" color="white" size={25} />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Search ..."
          placeholderTextColor={'gray'}
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
      </Row>
      <FormattedList
        TopicList={filteredItems}
        arrayName="filteredItems"
        setSelectedCount={setSelectedItemCount}
        setSelectedItems={setSelectedItems}
        resetSelection={resetSelection}
        setResetSelection={setResetSelection}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '90%',
    fontSize: 18,
    color: 'white',
  },
  // listItem: {
  //   padding: 15,
  //   borderBottomWidth: 1,
  //   borderBottomColor: GRAY,
  // },
  itemText: {
    fontSize: 16,
    color: 'black',
  },
});

export default SearchHome;
