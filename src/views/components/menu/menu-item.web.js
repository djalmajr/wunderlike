import React, { Component } from 'react';

class MenuItem extends Component {
  static propTypes = {
    badge: React.PropTypes.string,
    // editingText: React.PropTypes.string,
    id: React.PropTypes.string,
    isSelected: React.PropTypes.bool,
    listItemTitle: React.PropTypes.string,
    style: React.PropTypes.object,

    handleTitleEdited: React.PropTypes.func,
    handleDoubleClick: React.PropTypes.func,
    handleKeyPress: React.PropTypes.func,
    handleSelectItemMenu: React.PropTypes.func,
    handleDeleteItemMenu: React.PropTypes.func,
  };

  static defaultProps = {
    badge: '',
    editingText: '',
    id: '',
    isSelected: false,
    listItemTitle: 'Lista --',
    style: {},

    handleTitleEdited: () => 0,
    handleDoubleClick: () => 0,
    handleKeyPress: () => 0,
    handleSelectItemMenu: () => 0,
    handleDeleteItemMenu: () => 0,
  };

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      isSelected: false,
    };
  }

  toggleListEditing = (e) => {
    this.setState({
      isEditing: !this.state.isEditing,
      editingText: e.currentTarget.textContent,
    });
  }

  saveNewTitleList = (e, id) => {
    const { handleTitleEdited } = this.props;
    let newTitle = e.currentTarget.value.trim(),
        oldTitle = this.state.editingText;

    if (newTitle !== "") {
      this.setState({
        isEditing: !this.state.isEditing,
      }, handleTitleEdited(id, newTitle));
    }
  }

  render() {
    const { isEditing } = this.state;
    const {
      id,
      badge,
      style,
      listItemTitle,
      isSelected,
      handleSelectItemMenu,
      handleDeleteItemMenu,
    } = this.props;

    return (
      <li
        key={id}
        className={`${style.sidebarItem} ${style.flex}  ${style.flexJustifyBetween} ${isSelected ? style.sidebarItemActive : ""}`}
      >
        <a
          href="#/lists/listname"
          className={`${style.flex} ${style.flex1} ${style.flexJustifyBetween} ${style.flexAlignItemsCenter}`}
        >
          <i className={`unordered list icon ${style.listIcon}`} />
          {!isEditing ? (
            <span
              className={`${style.listTitle} ${style.flex} ${style.flex1} ${style.flexAlignItemsCenter}`}
              onDoubleClick={this.toggleListEditing}
              onClick={() => handleSelectItemMenu(id)}
            >
              {listItemTitle}
            </span>
          ) : (
            <input
              autoFocus
              defaultValue={this.state.editingText}
              className={`${style.listInput}`}
              onBlur={(e) => this.saveNewTitleList(e, id)}
              onKeyPress={(e) => {
                if (
                  (e.which === 13 || e.keyCode === 13)
                  && e.key === 'Enter'
                  && e.target.value.length > 0
                ) {
                  this.saveNewTitleList(e, id);
                }
              }}
              type="text"
            />
          )}
          <span className={`${style.listCounter}`}>{badge}</span>
        </a>
        {isSelected &&
          <a
            href="#/list/delete/{id}"
            title="Deletar Lista"
            className={`${style.flex} ${style.flexJustifyBetween} ${style.flexAlignItemsCenter}`}
            onClick={() => handleDeleteItemMenu(id)}
          >
            <i className={`trash icon ${style.listIcon} ${style.deleteListItemIcon}`} />
          </a>
        }
      </li>
    );
  }
}

export default MenuItem;
