import React, { Component } from 'react';
import { v4 } from 'uuid';
import { connect } from 'react-redux';
import Toast from 'react-native-simple-toast';
import emptyFunction from 'fbjs/lib/emptyFunction';
import * as actionCreators from '../../../store/actions';
import * as selectors from '../../../store/selectors';
import Input from '../../components/todo-list/input';

const getInitState = () => ({ title: '', starred: false });

class InputContainer extends Component {
  static propTypes = {
    currListId: React.PropTypes.string,
    onCreate: React.PropTypes.func,
  };

  static defaultProps = {
    currListId: '',
    onCreate: emptyFunction,
  };

  state = getInitState();

  handleChange = (title) => {
    this.setState({ title });
  };

  handleStarred = () => {
    this.setState({ starred: !this.state.starred });
  };

  handleCreate = () => {
    const { currListId, onCreate } = this.props;
    const { starred, title } = this.state;
    const data = { id: v4(), starred, title: title.trim(), listId: currListId };

    if (data.title) {
      this.setState(getInitState(), () => onCreate(data));
    } else {
      Toast.show('Informe um texto para uma nova tarefa.');
    }
  };

  render() {
    const { starred, title } = this.state;

    return (
      <Input
        starred={starred}
        title={title}
        onCreate={this.handleCreate}
        onChange={this.handleChange}
        onToggleStarred={this.handleStarred}
      />
    );
  }
}

const mapStateToProps = state => ({
  currListId: selectors.getSelectedListId(state),
});

const mapDispatchToProps = dispatch => ({
  onCreate: todo => dispatch(actionCreators.createTodo(todo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputContainer);
