import React from 'react';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const Message = () => (
  <Text style={styles.instructions}>
    Double tap R on your keyboard to reload,{'\n'}
    Shake or press menu button for dev menu...
  </Text>
);

export default Message;
