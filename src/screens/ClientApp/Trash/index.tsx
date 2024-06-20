import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import FormattedList from '../../../CustomComponents/FormattedList';
import {useSelector} from 'react-redux';
import {RootState} from '../../../services/ReduxToolkit/store';
import {DilemmaType} from '../../../services/ReduxToolkit/dataSlice';

type TrashConsProps = {
  selectedItem: DilemmaType;
};

const Trash: React.FC<TrashConsProps> = () => {
  const removedItems = useSelector(
    (state: RootState) => state.data.removedItems,
  );

  return <FormattedList TopicList={removedItems} arrayName="removedItems" />;
};

export default Trash;
