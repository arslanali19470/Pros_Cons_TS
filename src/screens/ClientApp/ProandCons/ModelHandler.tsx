import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Row} from 'native-base';
import Modal from 'react-native-modal';

import Heading from '../../../components/Headings/Heading';
import Space from '../../../components/spacer/Space';
import Gradiant_Button from '../../../components/Gradiant_Button/Gradiant_Button';
interface ModalHandlerProps {
  isModalVisible: boolean;
  toggleModal: () => void;
}

export const ModelHandler: React.FC<ModalHandlerProps> = ({
  isModalVisible,
  toggleModal,
}) => {
  return (
    <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
      <View style={styles.modal}>
        <Heading text="Argument Settings" textAlign="center" />
        <Space height={20} />
        <Row justifyContent="space-between">
          <Heading text="Short by" />
          <Heading text="Time" />
        </Row>
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
            onPress={toggleModal}>
            CANCEL
          </Button>
          <Gradiant_Button
            title={'Save'}
            color={'white'}
            alignSelf="flex-end"
          />
        </Row>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});
