import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MdIcon from 'react-native-vector-icons/MaterialIcons';
import * as actionCreators from '../../../store/actions';
import * as selectors from '../../../store/selectors';
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
    onRemove: React.PropTypes.func.isRequired,
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

  handleItemPress = (id) => {
    const { navigator } = this.props;

    navigator.push({ key: 'todo-view', payload: { id } });
  };

  handleItemRemove = (todo) => {
    const type = todo.completedAt ? 'completedIds' : 'uncompletedIds';
    const newState = { [type]: this.props[type].filter(tid => tid !== todo.id) };

    console.log(this.state, newState);

    this.setState(newState, () => {
      const message = `"${todo.title}" será excluído permanentemente.`;
      const options = [
        { text: 'Não', style: 'cancel', onPress: () => this.setState({ [type]: this.props[type] }) },
        { text: 'Excluir', style: 'destructive', onPress: () => this.props.onRemove(todo) },
      ];

      setTimeout(() => Alert.alert('Excluir Tarefa?', message, options), 100);
    });
  };

  handleIconPress = () => {
    this.drawer.handleOpenDrawer();
  };

  handleSettingsPress = () => {};

  handleSortPress = () => {};

  render() {
    const { navigator, route } = this.props;
    const { completedIds, uncompletedIds } = this.state;
    const actionButtons = [
      {
        iconComponent: MdIcon,
        iconName: 'sort-by-alpha',
        iconSize: 22,
        onPress: this.handleSortPress,
      },
      {
        iconComponent: EntypoIcon,
        iconName: 'dots-three-vertical',
        iconSize: 16,
        onPress: this.handleSettingsPress,
      },
    ];

    return (
      <Drawer
        ref={ref => (this.drawer = ref)}
        menu={<Menu navigator={navigator} route={route} />}
      >
        <Container
          title="Caixa de Entrada"
          actionButtons={actionButtons}
          onIconPress={this.handleIconPress}
        >
          <List
            completedIds={completedIds}
            uncompletedIds={uncompletedIds}
            renderInput={() => <Input />}
            renderItem={id => (
              <Item
                id={id}
                onPress={this.handleItemPress}
                onRemove={this.handleItemRemove}
              />
            )}
          />
        </Container>
      </Drawer>
    );
  }
}

const mapStateToProps = (state) => {
  const listId = selectors.getSelectedListId(state);

  return {
    completedIds: selectors.getCompletedTodoIds(listId, state),
    uncompletedIds: selectors.getUncompletedTodoIds(listId, state),
  };
};

const mapDispatchToProps = dispatch => ({
  onRemove: todo => dispatch(actionCreators.removeTodo(todo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodosContainer);
