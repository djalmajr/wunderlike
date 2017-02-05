import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
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

class Todos extends React.Component {
  static propTypes = {
    todos: React.PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      todos: props.todos,
    };
  }

  handleItemSwipe = (todo) => {
    const { todos } = this.state;
    const message = `"${todo.title}" será excluído permanentemente.`;
    const options = [
      { text: 'Não', style: 'cancel', onPress: this.restoreTodos },
      { text: 'Excluir', style: 'destructive' },
    ];

    this.setState(
      { todos: todos.filter(item => item.id !== todo.id) },
      () => setTimeout(() => Alert.alert('Excluir Tarefa', message, options), 100),
    );
  }

  restoreTodos = () => {
    this.setState({ todos: this.props.todos });
  }

  render() {
    const { todos } = this.state;

    return (
      <View style={styles.content}>
        <FormInput />
        <View style={{ flexDirection: 'column-reverse' }}>
          {todos.map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              onSwipe={this.handleItemSwipe}
            />
          ))}
        </View>
        <Button small transparent style={styles.btn} textStyle={styles.btnText}>
          MOSTRAR TAREFAS CONCLUÍDAS
        </Button>
      </View>
    );
  }
}

export default Todos;
