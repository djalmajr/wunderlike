import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as selectors from '../../store/selectors';
import Menu from '../components/menu';

class MenuContainer extends Component {
  static propTypes = {
    lists: React.PropTypes.array.isRequired,
    listsLen: React.PropTypes.object.isRequired,
    selectedListId: React.PropTypes.string.isRequired,
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
    const { selectedListId, lists, listsLen } = this.props;

    return (
      <Menu
        lists={lists}
        listsLen={listsLen}
        selectedListId={selectedListId}
        onMenuPress={this.handleMenuPress}
      />
    );
  }
}

const mapStateToProps = state => ({
  lists: selectors.getLists(state),
  listsLen: selectors.getListsLen(state),
  selectedListId: selectors.getSelectedListId(state),
});

export default connect(mapStateToProps)(MenuContainer);
