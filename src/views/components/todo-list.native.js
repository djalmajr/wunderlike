import React from 'react';
import { Alert, View } from 'react-native';
import { Button, List, Text } from 'native-base';
import emptyFunction from 'fbjs/lib/emptyFunction';
import TodoInput from './todo-list-input';
import TodoItem from './todo-item';

const styles = {
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
};

class TodoList extends React.Component {
  static propTypes = {
    completedTodos: React.PropTypes.array.isRequired,
    incompletedTodos: React.PropTypes.array.isRequired,
    onDelete: React.PropTypes.func,
    onSave: React.PropTypes.func,
    onToggleCompleted: React.PropTypes.func,
    onToggleStarred: React.PropTypes.func,
  };

  static defaultProps = {
    onDelete: emptyFunction,
    onSave: emptyFunction,
    onToggleCompleted: emptyFunction,
    onToggleStarred: emptyFunction,
  };

  constructor(props) {
    super(props);

    this.state = {
      completedTodos: props.completedTodos,
      incompletedTodos: props.incompletedTodos,
      showCompleted: false,
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

  handleToggleVisibleTodos = () => {
    this.setState({ showCompleted: !this.state.showCompleted });
  };

  renderTodos(todos) {
    return (
      <List
        dataArray={todos}
        renderRow={todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onSave={this.props.onSave}
            onSwipe={this.handleItemSwipe}
            onToggleCompleted={this.props.onToggleCompleted}
            onToggleStarred={this.props.onToggleStarred}
          />
        )}
      />
    );
  }

  render() {
    const { completedTodos, incompletedTodos, showCompleted } = this.state;

    return (
      <View style={styles.content}>
        <TodoInput onSave={this.props.onSave} />
        <View style={{ flexDirection: 'column-reverse' }}>
          {this.renderTodos(incompletedTodos)}
        </View>
        {!!completedTodos.length && (
          <Button
            small
            transparent
            style={styles.btn}
            onPress={this.handleToggleVisibleTodos}
          >
            <Text style={styles.btnText}>
              {showCompleted ? 'ESCONDER TAREFAS CONCLUÍDAS' : 'MOSTRAR TAREFAS CONCLUÍDAS'}
            </Text>
          </Button>
        )}
        {showCompleted && (
          <View style={{ flexDirection: 'column-reverse' }}>
            {this.renderTodos(completedTodos)}
          </View>
        )}
      </View>
    );
  }
}

export default TodoList;
