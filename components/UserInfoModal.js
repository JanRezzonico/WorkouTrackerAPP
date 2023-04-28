import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, Modal } from 'react-native';
import colors from '../assets/style/colors';
import WTButton from './wt/WTButton';
import WTIconButton from './wt/WTIconButton';
import WTDatePicker from './wt/WTDatePicker';

const UserInfoModal = ({ user, setUser, visible, setVisible }) => {
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [birthday, setBirthday] = useState(new Date(user.birthday));
  const [height, setHeight] = useState(user.height);
  const [weight, setWeight] = useState(user.weight);

  const handleSave = () => {
    setUser({
      first_name: firstName,
      last_name: lastName,
      birthday: birthday.toISOString(),
      height: parseInt(height),
      weight: parseInt(weight),
    });
  };
  const handleRequestClose = () => {
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setBirthday(new Date(user.birthday));
    setHeight(user.height);
    setWeight(user.weight);
    setVisible(!visible);
  }

  return (
    <Modal
      animationType='fade'
      visible={visible}
      transparent={true}
      onRequestClose={handleRequestClose}>
      
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.MAIN,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    width: Dimensions.get('window').width * 0.75,
    elevation: 20,
    shadowColor: 'black',
  },
  labelInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    color: 'white'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginTop: 8,
    marginBottom: 16,
    color: 'white'
  },
  datePicker: {
    width: '100%',
    marginBottom: 16,
  },
  horizontalContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default UserInfoModal;