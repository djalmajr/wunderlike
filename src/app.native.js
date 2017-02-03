import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Message from './message';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const Wunderlike = () => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      Welcome to React Native!!
    </Text>
    <Message />
  </View>
);

export default Wunderlike;
