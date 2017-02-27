import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions';
import * as selectors from '../../../store/selectors';
import Item from '../../components/todo-list/item';

const ItemContainer = props => (
  <Item
    todo={props.todo}
    onDelete={props.onDelete}
    onToggleCompleted={props.onToggleCompleted}
    onToggleStarred={props.onToggleStarred}
  />
);

ItemContainer.propTypes = {
  todo: React.PropTypes.object.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onToggleCompleted: React.PropTypes.func.isRequired,
  onToggleStarred: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state, { id }) => ({
  todo: selectors.getTodoById(id)(state),
});

const mapDispatchToProps = dispatch => ({
  onToggleCompleted: todo => dispatch(actionCreators.toggleCompleted(todo)),
  onToggleStarred: todo => dispatch(actionCreators.toggleStarred(todo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer);
