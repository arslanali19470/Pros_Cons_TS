import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {Row} from 'native-base';
import {Ionicons, MaterialIcons} from '../../../utils/AppConstants';
import {useNavigation} from '@react-navigation/native';
// import FormattedList from '../../../CustomComponents/FormattedList'
import {GRAY} from '../../../styles/Colors';

const SearchHome = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <Row
        style={{backgroundColor: GRAY, padding: 10}}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="keyboard-backspace" color="white" size={25} />
        </TouchableOpacity>
        <TextInput
          style={{width: '90%', fontSize: 18, color: 'white'}}
          placeholder="Search ..."
          placeholderTextColor={'gray'}
        />
      </Row>
      {/* <FormattedList /> */}
    </View>
  );
};

export default SearchHome;
