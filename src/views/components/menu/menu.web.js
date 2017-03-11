import React from 'react';
import MenuItem from './menu-item';

const listItems = [
  {
    badge: '4',
    id: '1',
    listItemTitle: 'Lista de Filmes a Ver',
  }, {
    badge: '10',
    id: '2',
    listItemTitle: 'Lista de Livros a Ler',
  },
];

const Menu = ({ style, listItemSelected, isCreatingList, ...props }) => {
  return (
    <div className={`${style.side} ${style.flex} ${style.flexCol}`}>
      <header className={`${style.sideHeader}`}>
        <i className="content icon" style={{ color: 'white', fontSize: '1.3em' }} />
      </header>
      <section className={`${style.flex1}`}>
        <ul>
          {listItems.map(item => (
            <MenuItem
              key={item.id}
              badge={item.badge}
              id={item.id}
              isSelected={(listItemSelected === item.id)}
              listItemTitle={item.listItemTitle}
              style={style}
              handleSelectItemMenu={props.handleSelectItemMenu}
              handleDeleteItemMenu={props.handleDeleteItemMenu}
            />
          ))}
        </ul>
      </section>
      <footer className={`sidebar-actions ${style.footerSidebarList} ${style.flex} ${style.flexJustifyBetween} ${style.flexAlignItemsCenter}`}>
        {isCreatingList ?
          (<a
            href="#/create/list"
            className={`${style.flex} ${style.flex1} ${style.flexJustifyBetween} ${style.flexAlignItemsCenter}`}
          >
            <i className={`plus icon ${style.sideActionIcon}`} />
            <span
              className={`${style.flex} ${style.flex1}
                ${style.sideActionTitle}
                ${style.flexAlignItemsCenter}
              `}
            >
              Criar lista
            </span>
          </a>)
          :
          (
            <input className={`${style.clearAppearance}`} />
          )
        }
      </footer>
    </div>
  );
};

Menu.propTypes = {
  style: React.PropTypes.object,
//   lists: React.PropTypes.array.isRequired,
//   listsLen: React.PropTypes.object.isRequired,
//   selectedListId: React.PropTypes.string.isRequired,
  handleDeleteItemMenu: React.PropTypes.func.isRequired,
  handleSelectItemMenu: React.PropTypes.func.isRequired,
};

Menu.defaultProps = {
  style: {},
  handleDeleteItemMenu: () => 0,
  handleSelectItemMenu: () => 0,
};

export default Menu;
