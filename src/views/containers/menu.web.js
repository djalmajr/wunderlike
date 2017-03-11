import React, { Component } from 'react';
import Menu from '../components/menu';

class MenuContainer extends Component {
  static propTypes = {
    MenuStyle: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      editingText: '',
      listItemSelected: 0,
    };
  }

  toggleListEditing = (e) => {
    this.setState({
      isEditing: !this.state.isEditing,
      editingText: e.currentTarget.textContent,
    });
  }

  onSelectMenuItemClick = (idList) => {
    console.log('idList', idList);

    this.setState({listItemSelected: idList});
  }

  onDeleteMenuItemClick = (idList) => {
    console.log('idList deleted', idList);

    // this.setState({listItemSelected: idList});
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
