import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import SwipeableRow from 'react-native/Libraries/Experimental/SwipeableRow/SwipeableRow';
import IonIcon from 'react-native-vector-icons/Ionicons';
import emptyFunction from 'fbjs/lib/emptyFunction';
import emptyObject from 'fbjs/lib/emptyObject';

const size = 50;

const { width } = Dimensions.get('window');

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
});

class Todo extends Component {
  static propTypes = {
    todo: React.PropTypes.object.isRequired,
    onOpen: React.PropTypes.func.isRequired,
    onSwipe: React.PropTypes.func.isRequired,
    onToggleCompleted: React.PropTypes.func.isRequired,
    onToggleStarred: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    todo: emptyObject,
    onOpen: emptyFunction,
    onSwipe: emptyFunction,
    onToggleCompleted: emptyFunction,
    onToggleStarred: emptyFunction,
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
  };

  handlePressed = () => {
    // if (this.props.todo.id === store.openId) { return store.setOpenId(null); }

    this.props.onOpen(this.props.todo);
  };

  handleOpen = () => {
    this.props.onSwipe(this.props.todo);
  }

  render() {
    const { todo } = this.props;
    const checkmarkVisible = todo.completed || this.state.pressedIn;

    return (
      <SwipeableRow
        isOpen={false}
        maxSwipeDistance={0}
        shouldBounceOnMount={false}
        swipeThreshold={width / 3}
        slideoutView={<View />}
        onOpen={this.handleOpen}
      >
        <TouchableHighlight
          underlayColor="#d6eeff"
          activeOpacity={1}
          style={[styles.container, { backgroundColor: 'white' }]}
          onPress={this.handlePressed}
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
      </SwipeableRow>
    );
  }
}

export default Todo;
