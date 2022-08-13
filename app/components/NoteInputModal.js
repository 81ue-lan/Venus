import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Modal,
  Text,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from 'react-native';

import RoundIconBtn from './RoundIconBtn';

import { dataTopProducts } from "../data/dataArrays";
import {ScanResultItem,Gap} from '../component';

const NoteInputModal = ({ visible, onClose, onSubmit, note, isEdit }) => {
  const [title, setTitle] = useState('');
  const [use, setUse] = useState('');
  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isEdit) {
      setTitle(note.title);
      setUse(note.use);
    }
  }, [isEdit]);

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === 'title') setTitle(text);
    if (valueFor === 'use') setUse(text);
  };

  const handleSubmit = () => {
    if (!title.trim() && !use.trim()) return onClose();

    if (isEdit) {
      onSubmit(title, use);
    } else {
      onSubmit(title, use);
      setTitle('');
      setUse('');
    }
    onClose();
  };

  const closeModal = () => {
    if (!isEdit) {
      setTitle('');
      setUse('');
    }
    onClose();
  };

  return (
    <>
      <StatusBar hidden />
      <Modal visible={visible} animationType='fade'>
        <SafeAreaView style={styles.container}>
          <TextInput
            value={title}
            onChangeText={text => handleOnChangeText(text, 'title')}
            placeholder='產品名稱'
            style={[styles.input, styles.title]}
          />
          <TextInput
            value={use}
            multiline
            placeholder='產品用途'
            style={[styles.input, styles.use]}
            onChangeText={text => handleOnChangeText(text, 'use')}
          />
              
          <View style={styles.btnContainer}>
            <RoundIconBtn
              size={15}
              antIconName='check'
              onPress={handleSubmit}
            />
            {title.trim() || use.trim() ? (
              <RoundIconBtn
                size={15}
                style={{ marginLeft: 15 }}
                antIconName='close'
                onPress={closeModal}
              />
            ) : null}
          </View>

        </SafeAreaView>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  input: {
    margin: 10,
    paddingLeft:8,
    height: 53,
    borderColor: '#D1ACDE',
    borderWidth: 2,
    borderRadius: 100,
  },
  title: {
    height: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  use: {
    height: 100,
    borderRadius: 15,
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
  },
});

export default NoteInputModal;
