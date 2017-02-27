import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as selectors from '../../store/selectors';
import Menu from '../components/menu';

class MenuContainer extends Component {
  static propTypes = {
    lists: React.PropTypes.array.isRequired,
    currListId: React.PropTypes.string.isRequired,
    todoIdsInList: React.PropTypes.object.isRequired,
    // navigator: React.PropTypes.object.isRequired,
    // route: React.PropTypes.object.isRequired,
  };

  static contextTypes = {
    closeDrawer: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
  };

  handleMenuPress = (listId) => {
    console.log(listId);

    this.context.closeDrawer();
    // this.navigator.push({})
  };

  render() {
    const { currListId, lists, todoIdsInList } = this.props;

    return (
      <Menu
        lists={lists}
        todoIdsInList={todoIdsInList}
        currListId={currListId}
        onMenuPress={this.handleMenuPress}
      />
    );
  }
}

const mapStateToProps = state => ({
  lists: selectors.getLists(state),
  currListId: selectors.getSelectedListId(state),
  todoIdsInList: selectors.getTodoIdsInList(state),
});

export default connect(mapStateToProps)(MenuContainer);
