import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

const size = 50;

const styles = StyleSheet.create({
  btn: {
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  starBg: {
    position: 'absolute',
    top: 0,
    left: 13,
    width: 25,
    height: 44,
    backgroundColor: '#d74e48',
  },
  bottomTriangle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 0,
    borderBottomWidth: 3,
    borderRightWidth: 12,
    borderLeftWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
  },
});

export default class extends Component {
  onStarred() {
    store.toggleStarred(this.props.todo);
  }

  render() {
    const { todo } = this.props;

    return (
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={1}
        onPress={this.onStarred.bind(this)}
      >
        {todo.starred && <View style={styles.starBg}>
          <View style={styles.bottomTriangle} />
        </View>}

        <IonIcon
          name={`ios-star${todo.starred ? '' : '-outline'}`}
          size={todo.starred ? 20 : 24}
          color={todo.starred ? 'white' : '#555'}
        />
      </TouchableOpacity>
    );
  }
}
