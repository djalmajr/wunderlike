import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button } from 'native-base';
import emptyFunction from 'fbjs/lib/emptyFunction';
import TodoInput from './todo-list-input';
import TodoItem from './todo-item';

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

class TodoList extends React.Component {
  static propTypes = {
    completedTodos: React.PropTypes.array.isRequired,
    incompletedTodos: React.PropTypes.array.isRequired,
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
      completedTodos: props.completedTodos,
      incompletedTodos: props.incompletedTodos,
    };
  }

  componentWillReceiveProps({ completedTodos, incompletedTodos }) {
    if (completedTodos !== this.props.completedTodos) {
      this.setState({ completedTodos });
    }

    if (incompletedTodos !== this.props.incompletedTodos) {
      this.setState({ incompletedTodos });
    }
  }

  handleItemSwipe = (todo) => {
    const message = `"${todo.title}" será excluído permanentemente.`;
    const status = todo.completedAt ? 'completed' : 'incompleted';
    const restore = stats => this.setState({ [`${stats}Todos`]: this.props[`${stats}Todos`] });
    const options = [
      { text: 'Não', style: 'cancel', onPress: () => restore(status) },
      { text: 'Excluir', style: 'destructive', onPress: () => this.props.onDelete(todo) },
    ];

    this.setState(
      { [`${status}Todos`]: this.props[`${status}Todos`].filter(item => item.id !== todo.id) },
      () => setTimeout(() => Alert.alert('Excluir Tarefa?', message, options), 100),
    );
  }

  render() {
    const { completedTodos, incompletedTodos } = this.state;

    return (
      <View style={styles.content}>
        <TodoInput />
        <View style={{ flexDirection: 'column-reverse' }}>
          {incompletedTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={this.props.onEdit}
              onSwipe={this.handleItemSwipe}
              onToggleCompleted={this.props.onToggleCompleted}
              onToggleStarred={this.props.onToggleStarred}
            />
          ))}
        </View>
        {!!completedTodos.length && (
          <Button small transparent style={styles.btn} textStyle={styles.btnText}>
            MOSTRAR TAREFAS CONCLUÍDAS
          </Button>
        )}
        <View style={{ flexDirection: 'column-reverse' }}>
          {completedTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={this.props.onEdit}
              onSwipe={this.handleItemSwipe}
              onToggleCompleted={this.props.onToggleCompleted}
              onToggleStarred={this.props.onToggleStarred}
            />
          ))}
        </View>
      </View>
    );
  }
}

export default TodoList;
