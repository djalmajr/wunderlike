import React from 'react';
import { View } from 'react-native';
import { Button, Input } from 'native-base';
import IonIcon from 'react-native-vector-icons/Ionicons';
import emptyFunction from 'fbjs/lib/emptyFunction';

const size = 50;

const styles = {
  container: {
    backgroundColor: 'rgba(88,141,100,0.85)',
    borderRadius: 2,
    flexDirection: 'row',
    height: size,
    marginBottom: 5,
    overflow: 'hidden',
  },
  placeholder: {
    alignItems: 'center',
    height: size,
    justifyContent: 'center',
    width: size,
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

const TodoInput = ({ starred, title, onChange, onSave, onToggleStarred }) => (
  <View style={styles.container}>
    <Button
      transparent
      style={{ ...styles.placeholder, paddingTop: 4 }}
      onPress={onSave}
    >
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
        onSubmitEditing={onSave}
      />
    </View>
    <Button transparent style={styles.placeholder} onPress={onToggleStarred}>
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
  onSave: React.PropTypes.func,
  onToggleStarred: React.PropTypes.func,
};

TodoInput.defaultProps = {
  starred: false,
  title: '',
  onChange: emptyFunction,
  onSave: emptyFunction,
  onToggleStarred: emptyFunction,
};

export default TodoInput;