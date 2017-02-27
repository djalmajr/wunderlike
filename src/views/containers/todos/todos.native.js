import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { deleteTodo } from '../../../store/actions';
import { getTodoIdsFromSelectedListByStatus } from '../../../store/selectors';
import Drawer from '../../components/drawer';
import Container from '../../components/container';
import List from '../../components/todo-list';
import Input from './input';
import Item from './item';
import Menu from '../menu';

class TodosContainer extends Component {
  static propTypes = {
    completedIds: React.PropTypes.array.isRequired,
    uncompletedIds: React.PropTypes.array.isRequired,
    navigator: React.PropTypes.object.isRequired,
    route: React.PropTypes.object.isRequired,
    onDelete: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      completedIds: props.completedIds,
      uncompletedIds: props.uncompletedIds,
    };
  }

  componentWillReceiveProps({ completedIds, uncompletedIds }) {
    if (completedIds !== this.props.completedIds) {
      this.setState({ completedIds });
    }

    if (uncompletedIds !== this.props.uncompletedIds) {
      this.setState({ uncompletedIds });
    }
  }

  handleDelete = (todo) => {
    const message = `"${todo.title}" será excluído permanentemente.`;
    const status = todo.completedAt ? 'completed' : 'uncompleted';
    const restore = type => this.setState({ [`${type}Todos`]: this.props[`${type}Todos`] });
    const options = [
      { text: 'Não', style: 'cancel', onPress: () => restore(status) },
      { text: 'Excluir', style: 'destructive', onPress: () => this.props.onDelete(todo) },
    ];

    this.setState(
      { [`${status}Todos`]: this.props[`${status}Todos`].filter(item => item.id !== todo.id) },
      () => setTimeout(() => Alert.alert('Excluir Tarefa?', message, options), 100),
    );
  };

  handleMenuPress = () => {
    this.drawer.handleOpenDrawer();
  };

  render() {
    const { completedIds, uncompletedIds, navigator, route } = this.props;

    return (
      <Drawer
        ref={ref => (this.drawer = ref)}
        menu={<Menu navigator={navigator} route={route} />}
      >
        <Container title="Caixa de Entrada" onMenuPress={this.handleMenuPress}>
          <List
            completedIds={completedIds}
            uncompletedIds={uncompletedIds}
            renderInput={() => <Input />}
            renderItem={id => <Item id={id} onDelete={this.handleDelete} />}
          />
        </Container>
      </Drawer>
    );
  }
}

const mapStateToProps = state => ({
  completedIds: getTodoIdsFromSelectedListByStatus('completed', state),
  uncompletedIds: getTodoIdsFromSelectedListByStatus('uncompleted', state),
});

const mapDispatchToProps = dispatch => ({
  onDelete: todo => dispatch(deleteTodo(todo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodosContainer);
