import React from 'react';
import { Alert, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { DeckSwiper } from 'native-base';
import emptyFunction from 'fbjs/lib/emptyFunction';
import emptyObject from 'fbjs/lib/emptyObject';

const size = 50;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 2,
    height: size,
    marginBottom: 1,
    overflow: 'hidden',
  },
  wrap: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
  },
  btn: {
    height: size,
    justifyContent: 'center',
    width: size,
    alignItems: 'center',
  },
  checkbox: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: '#555',
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    height: 18,
    justifyContent: 'center',
    paddingTop: 3,
    width: 18,
  },
  title: {
    backgroundColor: 'transparent',
    color: '#111',
    fontSize: 16,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  checked: {
    color: '#555',
    textDecorationLine: 'line-through',
  },
  swipeBtns: {
    alignSelf: 'flex-end',
    borderRadius: 3,
    flexDirection: 'row',
    height: size - 6,
    overflow: 'hidden',
    top: 3,
    width: size * 2,
  },
  swipeBtn: {
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  deleteBtn: {
    backgroundColor: '#ee3229',
    marginLeft: 6,
  },
  editBtn: {
    backgroundColor: '#0f85d9',
  },
  swipeIcon: {
    color: 'white',
    fontSize: 24,
  },
});

class Todo extends React.Component {
  static propTypes = {
    todo: React.PropTypes.object.isRequired,
    onOpen: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    onToggleCompleted: React.PropTypes.func.isRequired,
    onToggleStarred: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    todo: emptyObject,
    onOpen: emptyFunction,
    onDelete: emptyFunction,
    onToggleCompleted: emptyFunction,
    onToggleStarred: emptyFunction,
  };

  constructor(props) {
    super(props);

    this.state = {
      pressedIn: false,
      todo: props.todo,
    };
  }

  handlePressIn = () => {
    this.setState({ pressedIn: true });
  };

  handlePressOut = () => {
    this.setState({ pressedIn: false });
  };

  handleComplete = () => {
    this.props.onToggleCompleted(this.props.todo);
  };

  handleStarred = () => {
    this.props.onToggleStarred();
  };

  handleEdit = () => {
    this.props.onOpen(this.props.todo);
  };

  handleDelete = () => {
    this.props.onDelete(this.props.todo);
  };

  handleTodoPressed = () => {
    // if (this.props.todo.id === store.openId) { return store.setOpenId(null); }

    this.props.onOpen(this.props.todo);
  };

  handleShowAlert = () => {
    const message = `"${this.props.todo.title}" will be deleted forever.`;
    const options = [
      { text: 'No', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: this.handleDelete },
    ];

    Alert.alert('Delete To-do', message, options);
  };

  handleSwiping = () => {
    this.setState({ todo: undefined });
  };

  renderItem = (todo) => {
    if (!todo) {
      return null;
    }

    const checkmarkVisible = todo.completed || this.state.pressedIn;

    return (
      <TouchableHighlight
        underlayColor="#d6eeff"
        activeOpacity={1}
        style={[styles.container, { backgroundColor: 'white' }]}
        onPress={this.handleTodoPressed}
      >
        <View style={[styles.wrap, { opacity: todo.completed ? 0.75 : 1 }]}>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={1}
            onPress={this.handleComplete}
            onPressIn={this.handleCheckPressIn}
            onPressOut={this.handleCheckPressOut}
          >
            <View style={styles.checkbox}>
              {checkmarkVisible && <IonIcon name="ios-checkmark-outline" size={28} color="#555" />}
            </View>
          </TouchableOpacity>
          <View style={styles.body}>
            <Text
              numberOfLines={1}
              style={[styles.title, todo.completed && styles.checked]}
            >
              {todo.title}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    const { todo } = this.state;

    return (
      <View style={{ position: 'relative' }}>
        <DeckSwiper
          dataSource={[todo]}
          renderItem={this.renderItem}
          onSwiping={this.handleSwiping}
        />
      </View>
    );
  }
}

export default Todo;
