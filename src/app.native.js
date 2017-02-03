import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
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
    <Text style={styles.instructions}>
      Double tap R on your keyboard to reload,{'\n'}
      Shake or press menu button for dev menu...
    </Text>
  </View>
);

export default Wunderlike;
