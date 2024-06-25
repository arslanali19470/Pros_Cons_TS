import React, {useState, useCallback} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import FormattedList from '../../../CustomComponents/FormattedList';
import {useSelector} from 'react-redux';
import {RootState} from '../../../services/ReduxToolkit/store';
import {DilemmaType} from '../../../services/ReduxToolkit/argumentSlice';
import {MaterialIcons, multiThemeColor} from '../../../utils/AppConstants';
import {Row} from 'native-base';
import Heading from '../../../components/Headings/Heading';
import {DrawerActions, useNavigation} from '@react-navigation/native';

const Trash: React.FC = () => {
  const removedItems = useSelector(
    (state: RootState) => state.data.removedItems,
  );

  const [selectedItemCount, setSelectedItemCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [resetSelection, setResetSelection] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={{backgroundColor: multiThemeColor().main_background, flex: 1}}>
      <View style={{backgroundColor: multiThemeColor().GRAY, padding: 15}}>
        <Row space={7} alignItems={'center'}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            style={{marginTop: 3}}>
            <MaterialIcons name={'menu'} color={'white'} size={25} />
          </TouchableOpacity>
          <Heading text={'Trash'} weight={700} fontSize={20} color={'white'} />
        </Row>
      </View>
      <ScrollView style={styles.container}>
        <FormattedList
          TopicList={removedItems}
          arrayName="removedItems"
          setSelectedCount={setSelectedItemCount}
          setSelectedItems={setSelectedItems}
          resetSelection={resetSelection}
          setResetSelection={setResetSelection}
        />
      </ScrollView>
    </View>
  );
};

export default Trash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
  },
});
