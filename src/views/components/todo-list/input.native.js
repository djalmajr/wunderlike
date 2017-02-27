import React from 'react';
import { View } from 'react-native';
import { Button, Input } from 'native-base';
import IonIcon from 'react-native-vector-icons/Ionicons';
import emptyFunction from 'fbjs/lib/emptyFunction';

const size = 50;

const styles = {
  button: {
    alignItems: 'center',
    height: size,
    justifyContent: 'center',
    width: size,
  },
  container: {
    backgroundColor: 'rgba(88,141,100,0.85)',
    borderRadius: 2,
    flexDirection: 'row',
    height: size,
    marginBottom: 5,
    overflow: 'hidden',
  },
  title: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 16,
    height: size,
    lineHeight: 12,
  },
  wrap: {
    flex: 1,
    justifyContent: 'center',
  },
};

const TodoInput = ({ starred, title, onChange, onCreate, onToggleStarred }) => (
  <View style={styles.container}>
    <Button transparent style={styles.button} onPress={onCreate}>
      <IonIcon name="ios-add-outline" size={32} color="white" />
    </Button>
    <View style={styles.wrap}>
      <Input
        value={title}
        style={styles.title}
        returnKeyType="done"
        placeholder="Adicionar uma tarefa..."
        placeholderTextColor="white"
        onChangeText={onChange}
        onSubmitEditing={onCreate}
      />
    </View>
    <Button transparent style={styles.button} onPress={onToggleStarred}>
      <IonIcon
        size={20}
        color="white"
        name={`ios-star${starred ? '' : '-outline'}`}
      />
    </Button>
  </View>
);

TodoInput.propTypes = {
  starred: React.PropTypes.bool,
  title: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onCreate: React.PropTypes.func,
  onToggleStarred: React.PropTypes.func,
};

TodoInput.defaultProps = {
  starred: false,
  title: '',
  onChange: emptyFunction,
  onCreate: emptyFunction,
  onToggleStarred: emptyFunction,
};

export default TodoInput;
