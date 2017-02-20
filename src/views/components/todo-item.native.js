import React from 'react';
import { Button, ListItem } from 'native-base';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import SwipeableRow from 'react-native/Libraries/Experimental/SwipeableRow/SwipeableRow';
import IonIcon from 'react-native-vector-icons/Ionicons';
import emptyFunction from 'fbjs/lib/emptyFunction';
import emptyObject from 'fbjs/lib/emptyObject';
import TodoItemStar from './todo-item-star';

const size = 50;

const { width } = Dimensions.get('window');

const styles = {
  container: {
    backgroundColor: 'white',
    borderRadius: 2,
    marginBottom: 1,
    overflow: 'hidden',
  },
  listItem: {
    borderWidth: 0,
    margin: 0,
    padding: 0,
    height: size,
    flex: 1,
  },
  wrap: {
    flex: 1,
    flexDirection: 'row',
  },
  completed: {
    opacity: 0.75,
  },
  btn: {
    alignItems: 'center',
    height: size,
    justifyContent: 'center',
    width: size,
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
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    color: '#111',
    fontSize: 16,
  },
  checked: {
    color: '#555',
    textDecorationLine: 'line-through',
  },
};

class TodoItem extends React.Component {
  static propTypes = {
    todo: React.PropTypes.object.isRequired,
    // onPress: React.PropTypes.func.isRequired,
    onSwipe: React.PropTypes.func.isRequired,
    onToggleCompleted: React.PropTypes.func.isRequired,
    onToggleStarred: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    todo: emptyObject,
    onPress: emptyFunction,
    onSwipe: emptyFunction,
    onToggleCompleted: emptyFunction,
    onToggleStarred: emptyFunction,
  };

  handleComplete = () => {
    this.props.onToggleCompleted(this.props.todo);
  };

  handleStarred = () => {
    this.props.onToggleStarred(this.props.todo);
  };

  handlePress = () => {
    // if (this.props.todo.id === store.openId) { return store.setOpenId(null); }

    // this.props.onPress(this.props.todo);
  };

  handleSwipe = () => {
    this.props.onSwipe(this.props.todo);
  }

  render() {
    const { todo } = this.props;
    const checkmarkVisible = !!todo.completedAt;

    return (
      <SwipeableRow
        isOpen={false}
        maxSwipeDistance={0}
        shouldBounceOnMount={false}
        swipeThreshold={width / 3}
        slideoutView={<View />}
        onOpen={this.handleSwipe}
      >
        <View style={[styles.container, todo.completedAt && styles.completed]}>
          <ListItem onPress={this.handlePress} style={styles.listItem}>
            <View style={styles.wrap}>
              <Button transparent style={styles.btn} onPress={this.handleComplete}>
                <View style={styles.checkbox}>
                  {checkmarkVisible && <IonIcon name="ios-checkmark-outline" size={28} color="#555" />}
                </View>
              </Button>
              <View style={styles.body}>
                <Text numberOfLines={1} style={[styles.title, todo.completedAt && styles.checked]}>
                  {todo.title}
                </Text>
              </View>
              <TodoItemStar starred={todo.starred} onPress={this.handleStarred} />
            </View>
          </ListItem>
        </View>
      </SwipeableRow>
    );
  }
}

export default TodoItem;
