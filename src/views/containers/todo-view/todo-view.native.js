import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import IonIcon from 'react-native-vector-icons/Ionicons';
// import * as actionCreators from '../../../store/actions';
import * as selectors from '../../../store/selectors';
import Container from '../../components/container';

const styles = {
  content: {
    backgroundColor: 'white',
    flex: 1,
  },
};

class TodoView extends Component {
  static propTypes = {
    navigator: React.PropTypes.object.isRequired,
    todo: React.PropTypes.object.isRequired,
  };

  handleIconPress = () => {
    const { navigator } = this.props;

    navigator.pop();
  };

  render() {
    const { todo } = this.props;

    return (
      <Container
        title={todo.title}
        icon={<IonIcon name="md-arrow-back" color="white" size={26} />}
        onIconPress={this.handleIconPress}
      >
        <View style={styles.content}>
          <Text>{todo.title}</Text>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state, { route: { payload } }) => ({
  todo: selectors.getTodoById(payload.id)(state),
});

// const mapDispatchToProps = dispatch => ({
//   onRemove: todo => dispatch(actionCreators.removeTodo(todo)),
// });

export default connect(mapStateToProps)(TodoView);
