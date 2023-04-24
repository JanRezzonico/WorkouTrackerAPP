import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import * as IconLibraries from 'react-native-vector-icons';
import PropTypes from 'prop-types';

const WTIconButton = ({ library, name, onPress, color = 'white', size = 30 }) => {
  const Icon = IconLibraries[library];
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name={name} color={color} size={size} />
    </TouchableOpacity>
  );
};

const libraryPropType = PropTypes.oneOf(Object.keys(IconLibraries));

WTIconButton.propTypes = {
  library: libraryPropType.isRequired,
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
  },
});

export default WTIconButton;