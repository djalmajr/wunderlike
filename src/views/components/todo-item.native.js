import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, TouchableOpacity, Alert } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import SwipeableRow from './swiper';
import StarButton from './star-button';

const size = 50;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 2,
    marginBottom: 1,
    height: size,
    overflow: 'hidden',
  },
  wrap: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  btn: {
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingTop: 3,
  },
  title: {
    color: '#111',
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  checked: {
    textDecorationLine: 'line-through',
    color: '#555',
  },
  swipeBtns: {
    width: size * 2,
    height: size - 6,
    top: 3,
    borderRadius: 3,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  swipeBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtn: {
    backgroundColor: '#ee3229',
  },
  editBtn: {
    backgroundColor: '#0f85d9',
  },
  swipeIcon: {
    fontSize: 24,
    color: 'white',
  },
});

class Todo extends Component {
  static propTypes = {
    todo: React.PropTypes.object,
    onOpen: React.PropTypes.func,
    onDelete: React.PropTypes.func,
    onToggleCompleted: React.PropTypes.func,
    onToggleStarred: React.PropTypes.func,
  };

  state = {
    pressedIn: false,
  };

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
  }

  handleEdit = () => {
    this.props.onOpen(this.props.todo);
  }

  handleDelete = () => {
    this.props.onDelete(this.props.todo);
  }

  handleTodoPressed = () => {
    // if (this.props.todo.id === store.openId) { return store.setOpenId(null); }

    this.props.onOpen(this.props.todo);
  }

  showDeleteAlert() {
    Alert.alert(
      `"${this.props.todo.title}" will be deleted forever.`,
      null,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: this.onDelete },
      ],
    );
  }

  renderSlideoutView() {
    return (
      <View style={styles.swipeBtns}>
        <TouchableOpacity
          style={[styles.swipeBtn, styles.editBtn]}
          activeOpacity={0.9}
          onPress={this.onEdit.bind(this)}
        >
          <IonIcon name={'ios-create-outline'} style={styles.swipeIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.swipeBtn, styles.deleteBtn]}
          activeOpacity={0.9}
          onPress={this.showDeleteAlert.bind(this)}
        >
          <IonIcon name={'ios-trash-outline'} style={styles.swipeIcon} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { todo } = this.props;
    const checkmarkVisible = todo.completed || this.state.pressedIn;
    const selectedTodo = store.selectedTodo && store.selectedTodo.id == todo.id;

    return (
      <SwipeableRow
        shouldBounceOnMount={false}
        maxSwipeDistance={size * 2 + 6}
        swipeThreshold={size / 2}
        slideoutView={this.renderSlideoutView()}
        onSwipeEnd={() => store.setScrollable(true)}
        onSwipeStart={() => {
          store.resetOpenId();
          store.setScrollable(false);
        }}
        onOpen={() => store.setOpenId(todo.id)}
        isOpen={todo.id === store.openId}
      >
        <TouchableHighlight
          style={[styles.container, {
            backgroundColor: selectedTodo ? '#d6eeff' : 'white',
          }]}
          underlayColor={'#d6eeff'}
          activeOpacity={1}
          onPress={this.onTodoPressed.bind(this)}
        >
          <View style={[styles.wrap, { opacity: todo.completed ? 0.75 : 1 }]}>
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={1}
              onPress={this.onComplete.bind(this)}
              onPressIn={this.onCheckPressIn.bind(this)}
              onPressOut={this.onCheckPressOut.bind(this)}
            >
              <View style={styles.checkbox}>
                {checkmarkVisible && <IonIcon name="ios-checkmark-outline" size={28} color="#555" />}
              </View>
            </TouchableOpacity>

            <View style={styles.body}>
              <P numberOfLines={1} style={[styles.title, todo.completed && styles.checked]}>{todo.title}</P>
            </View>

            <StarButton todo={todo} />
          </View>
        </TouchableHighlight>
      </SwipeableRow>
    );
  }
}

export default Todo;
