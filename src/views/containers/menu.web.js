import React, { Component } from 'react';
import Menu from '../components/menu';

class MenuContainer extends Component {
  static propTypes = {
    MenuStyle: React.PropTypes.object.isRequired,
  };

  state = {
    editingText: '',
    isEditing: false,
    listItemSelected: 0,
  };

  onSelectMenuItemClick = (idList) => {
    console.log('idList', idList);

    this.setState({ listItemSelected: idList });
  }

  onDeleteMenuItemClick = (idList) => {
    console.log('idList deleted', idList);

    // this.setState({listItemSelected: idList});
  }

  toggleListEditing = (e) => {
    this.setState({
      isEditing: !this.state.isEditing,
      editingText: e.currentTarget.textContent,
    });
  }

  render() {
    const { listItemSelected } = this.state;

    return (
      <Menu
        style={this.props.MenuStyle}
        listItemSelected={listItemSelected}
        handleDeleteItemMenu={this.onDeleteMenuItemClick}
        handleSelectItemMenu={this.onSelectMenuItemClick}
      />
    );
  }
}

export default MenuContainer;
