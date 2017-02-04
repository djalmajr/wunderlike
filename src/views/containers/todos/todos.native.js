import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'native-base';
import TodoForm from './form';

const styles = StyleSheet.create({
  btn: {
    alignSelf: 'center',
    backgroundColor: 'rgba(88,141,100,0.85)',
    marginVertical: 20,
  },
  btnText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 10,
  },
});

const Todos = () => (
  <View style={styles.content}>
    <TodoForm />
    <Button small transparent style={styles.btn} textStyle={styles.btnText}>
      SHOW COMPLETED TO-DOS
    </Button>
  </View>
);

export default Todos;
