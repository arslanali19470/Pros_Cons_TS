import React, {useState, useCallback} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import FormattedList from '../../../CustomComponents/FormattedList';
import {useSelector} from 'react-redux';
import {RootState} from '../../../services/ReduxToolkit/store';
import {DilemmaType} from '../../../services/ReduxToolkit/argumentSlice';

const Trash: React.FC = () => {
  const removedItems = useSelector(
    (state: RootState) => state.data.removedItems,
  );

  const [selectedItemCount, setSelectedItemCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [resetSelection, setResetSelection] = useState(false);

  return (
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
  );
};

export default Trash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
