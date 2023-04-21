import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import WTButton from './wt/WTButton';

const UserInfoModal = ({ user, setUser }) => {
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [birthday, setBirthday] = useState(new Date(user.birthday));
  const [height, setHeight] = useState(user.height.toString());
  const [weight, setWeight] = useState(user.weight.toString());

  const handleSave = () => {
    setUser({
      first_name: firstName,
      last_name: lastName,
      birthday: birthday.toISOString(),
      height: parseInt(height),
      weight: parseInt(weight),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.labelInfo}>Name</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
      />
      <Text style={styles.labelInfo}>Surname</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
      />
      <Text style={styles.labelInfo}>Birthday</Text>
      <WTDatePicker
        style={styles.datePicker}
        date={birthday}
        mode="date"
        format="DD/MM/YYYY"
        onDateChange={(date) => setBirthday(new Date(date))}
      />
      <Text style={styles.labelInfo}>Height</Text>
      <TextInput
        style={styles.input}
        value={height}
        keyboardType="numeric"
        onChangeText={setHeight}
      />
      <Text style={styles.labelInfo}>Weight</Text>
      <TextInput
        style={styles.input}
        value={weight}
        keyboardType="numeric"
        onChangeText={setWeight}
      />
      <WTButton text="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  labelInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginTop: 8,
    marginBottom: 16,
  },
  datePicker: {
    width: '100%',
    marginBottom: 16,
  },
});

export default UserInfoModal;