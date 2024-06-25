import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Row} from 'native-base';
import {Ionicons, MaterialIcons} from '../../../utils/AppConstants';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../services/ReduxToolkit/store';
import {DilemmaType} from '../../../services/ReduxToolkit/argumentSlice';
import {GRAY, WHITE} from '../../../styles/Colors';

const SearchHome = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<DilemmaType[]>([]);
  const FirstArray = useSelector((state: RootState) => state.data.array1);

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
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Row
        style={{backgroundColor: GRAY, padding: 10}}
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
      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <Text style={styles.itemText}>{item.TopicName}</Text>
          </View>
        )}
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
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: GRAY,
  },
  itemText: {
    fontSize: 16,
    color: 'black',
  },
});

export default SearchHome;
