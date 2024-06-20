import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Share, StyleSheet, Text} from 'react-native';
import {Button, Row} from 'native-base';
import {
  useNavigation,
  NavigationProp,
  useIsFocused,
} from '@react-navigation/native';
import {MaterialIcons, Modal} from '../../../utils/AppConstants';
import Heading from '../../../components/Headings/Heading';
import Space from '../../../components/spacer/Space';
import {GRAY, WHITE} from '../../../styles/Colors';
import Gradiant_Button from '../../../components/Gradiant_Button/Gradiant_Button';
import {ModelHandler} from './ModelHandler';
import {DilemmaType} from '../../../services/ReduxToolkit/dataSlice';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../../services/ReduxToolkit/store';
import {DeleteFromArray} from '../../../services/ReduxToolkit/dataSlice';

interface HeadProsConsProps {
  selectedItem: DilemmaType;
}

const Head_ProsCons: React.FC<HeadProsConsProps> = ({selectedItem}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isMoreVisible, setMoreVisible] = useState(false);
  const [isDeleteVisible, setDeleteVisible] = useState(false);
  const [topicName, setTopicName] = useState(selectedItem.TopicName);

  const dilemmas = useSelector((state: RootState) => state.data.array1);
  const updated = useSelector((state: RootState) => state.data.updated);

  const isFocused = useIsFocused();

  useEffect(() => {
    const updatedItem =
      dilemmas.find(item => item.id === selectedItem.id) ||
      updated.find(item => item.id === selectedItem.id);
    if (updatedItem) {
      setTopicName(updatedItem.TopicName);
    }
  }, [isFocused, dilemmas, updated]);

  const handleShare = async () => {
    setMoreVisible(false);
    try {
      await Share.share({
        title: 'Here is My Pros and Cons',
        message: 'I have Good Habits and want to improve more',
        url: 'https://google.com',
      });
    } catch (error) {
      console.error('Error sharing the content:', (error as Error).message);
    } finally {
      setMoreVisible(false);
    }
  };

  const handleDelete = () => {
    dispatch(DeleteFromArray(selectedItem.id));
    setDeleteVisible(false);
    navigation.goBack();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <View style={styles.header}>
        <Space height={15} />
        <Row
          justifyContent="space-between"
          alignItems="center"
          alignContent="center">
          <Row space={7}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons
                name="keyboard-backspace"
                color="white"
                size={25}
                style={{marginTop: 3}}
              />
            </TouchableOpacity>
            <Heading text="Dilemma" color="white" fontSize={20} />
          </Row>
          <Row space={5}>
            <TouchableOpacity onPress={toggleModal}>
              <MaterialIcons name="tune" color="white" size={25} />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="visibility-off" color="white" size={25} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMoreVisible(!isMoreVisible)}>
              <MaterialIcons name="more-vert" color="white" size={25} />
            </TouchableOpacity>
          </Row>
        </Row>
        <Space height={20} />
        <Text style={{color: WHITE, padding: 5, fontSize: 18}}>
          {topicName}
        </Text>
        <Space height={20} />
        <TouchableOpacity style={styles.editButton}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Dilemmas Description', {selectedItem})
            }>
            <MaterialIcons name="mode-edit" color={GRAY} size={30} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <Space height={60} />
      <ModelHandler isModalVisible={isModalVisible} toggleModal={toggleModal} />
      <Modal
        isVisible={isMoreVisible}
        onBackdropPress={() => setMoreVisible(false)}
        style={{margin: 0}}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={handleShare}>
            <Heading text="Share" />
          </TouchableOpacity>
          <Space height={20} />
          <TouchableOpacity onPress={handleDelete}>
            <Heading text="Delete" />
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal isVisible={isDeleteVisible}>
        <View style={styles.modal}>
          <Heading
            text="Move this Dilemma to Trash ?"
            textAlign="center"
            weight={600}
          />
          <Space height={40} />

          <Row
            width="90%"
            justifyContent="space-between"
            alignItems="center"
            alignContent="center"
            alignSelf="center">
            <Button
              size="sm"
              width={110}
              alignSelf="flex-end"
              variant="outline"
              borderColor="blue.400"
              onPress={() => setDeleteVisible(false)}>
              CANCEL
            </Button>
            <Gradiant_Button
              title={'OK'}
              color={'white'}
              alignSelf="flex-end"
              onPress={handleDelete}
            />
          </Row>
        </View>
      </Modal>
    </>
  );
};

export default Head_ProsCons;

const styles = StyleSheet.create({
  header: {
    backgroundColor: GRAY,
    padding: 10,
    position: 'relative',
  },
  editButton: {
    position: 'absolute',
    right: 20,
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 100,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: -25,
    borderWidth: 2,
    borderColor: GRAY,
  },
  modalContent: {
    backgroundColor: 'white',
    height: 120,
    width: 200,
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 20,
    borderRadius: 5,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});
