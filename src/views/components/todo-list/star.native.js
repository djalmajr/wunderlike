import React from 'react';
import { View } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { Button } from 'native-base';
import emptyFunction from 'fbjs/lib/emptyFunction';

const size = 50;

const styles = {
  btn: {
    alignItems: 'center',
    height: size,
    justifyContent: 'center',
    width: size,
  },
  starBg: {
    backgroundColor: '#d74e48',
    position: 'absolute',
    top: 0,
    left: 13,
    width: 25,
    height: 44,
  },
  bottomTriangle: {
    borderBottomWidth: 3,
    borderRightWidth: 12,
    borderLeftWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 0,
  },
};

const TodoItemStar = ({ starred, onPress }) => (
  <Button transparent style={styles.btn} onPress={onPress}>
    {starred && (
      <View style={styles.starBg}>
        <View style={styles.bottomTriangle} />
      </View>
    )}
    <IonIcon
      size={20}
      name={`ios-star${starred ? '' : '-outline'}`}
      color={starred ? 'white' : '#555'}
    />
  </Button>
);

TodoItemStar.propTypes = {
  starred: React.PropTypes.bool.isRequired,
  onPress: React.PropTypes.func,
};

TodoItemStar.defaultProps = {
  onPress: emptyFunction,
};

export default TodoItemStar;
