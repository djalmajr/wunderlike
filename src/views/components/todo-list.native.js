import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button } from 'native-base';
import emptyFunction from 'fbjs/lib/emptyFunction';
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
    onDelete: React.PropTypes.func,
    onEdit: React.PropTypes.func,
    onToggleCompleted: React.PropTypes.func,
    onToggleStarred: React.PropTypes.func,
  };

  static defaultProps = {
    onDelete: emptyFunction,
    onEdit: emptyFunction,
    onToggleCompleted: emptyFunction,
    onToggleStarred: emptyFunction,
  };

  constructor(props) {
    super(props);

    this.state = {
      todos: props.todos,
    };
  }

  componentWillReceiveProps({ todos }) {
    if (todos !== this.props.todos) {
      this.setState({ todos });
    }
  }

  handleItemSwipe = (todo) => {
    const message = `"${todo.title}" será excluído permanentemente.`;
    const options = [
      { text: 'Não', style: 'cancel', onPress: () => this.setState({ todos: this.props.todos }) },
      { text: 'Excluir', style: 'destructive', onPress: () => this.props.onDelete(todo) },
    ];

    this.setState(
      { todos: this.state.todos.filter(item => item.id !== todo.id) },
      () => setTimeout(() => Alert.alert('Excluir Tarefa?', message, options), 100),
    );
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
              onEdit={this.props.onEdit}
              onSwipe={this.handleItemSwipe}
              onToggleCompleted={this.props.onToggleCompleted}
              onToggleStarred={this.props.onToggleStarred}
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
