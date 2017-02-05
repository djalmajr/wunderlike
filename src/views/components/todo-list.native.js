import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'native-base';
import FormInput from './todo-input';
import Todo from './todo-item';

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

const Todos = ({ todos }) => (
  <View style={styles.content}>
    <FormInput />
    <View style={{ flexDirection: 'column-reverse' }}>
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </View>
    <Button small transparent style={styles.btn} textStyle={styles.btnText}>
      SHOW COMPLETED TO-DOS
    </Button>
  </View>
);

Todos.propTypes = {
  todos: React.PropTypes.array.isRequired,
};

export default Todos;
