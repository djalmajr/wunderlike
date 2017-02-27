import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { deleteTodo } from '../../../store/actions';
import { getTodoIdsFromSelectedList } from '../../../store/selectors';
import Drawer from '../../components/drawer';
import Container from '../../components/container';
import List from '../../components/todo-list';
import Input from './input';
import Item from './item';
import Menu from '../menu';

class TodosContainer extends Component {
  static propTypes = {
    completed: React.PropTypes.array.isRequired,
    uncompleted: React.PropTypes.array.isRequired,
    navigator: React.PropTypes.object.isRequired,
    route: React.PropTypes.object.isRequired,
    onDelete: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      completed: props.completed,
      uncompleted: props.uncompleted,
    };
  }

  componentWillReceiveProps({ completed, uncompleted }) {
    if (completed !== this.props.completed) {
      this.setState({ completed });
    }

    if (uncompleted !== this.props.uncompleted) {
      this.setState({ uncompleted });
    }
  }

  handleDelete = (todo) => {
    const type = todo.completedAt ? 'completed' : 'uncompleted';
    const newState = { [type]: this.props[type].filter(tid => tid !== todo.id) };

    this.setState(newState, () => {
      const message = `"${todo.title}" será excluído permanentemente.`;
      const options = [
        { text: 'Não', style: 'cancel', onPress: () => this.setState({ [type]: this.props[type] }) },
        { text: 'Excluir', style: 'destructive', onPress: () => this.props.onDelete(todo) },
      ];

      setTimeout(() => Alert.alert('Excluir Tarefa?', message, options), 100);
    });
  };

  handleMenuPress = () => {
    this.drawer.handleOpenDrawer();
  };

  render() {
    const { completed, uncompleted, navigator, route } = this.props;

    return (
      <Drawer
        ref={ref => (this.drawer = ref)}
        menu={<Menu navigator={navigator} route={route} />}
      >
        <Container title="Caixa de Entrada" onMenuPress={this.handleMenuPress}>
          <List
            completedIds={completed}
            uncompletedIds={uncompleted}
            renderInput={() => <Input />}
            renderItem={id => <Item id={id} onDelete={this.handleDelete} />}
          />
        </Container>
      </Drawer>
    );
  }
}

const mapStateToProps = state => getTodoIdsFromSelectedList(state);

const mapDispatchToProps = dispatch => ({
  onDelete: todo => dispatch(deleteTodo(todo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodosContainer);
