import React from 'react';
import { View } from 'react-native';
import { Button, Input } from 'native-base';
import IonIcon from 'react-native-vector-icons/Ionicons';

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

class TodoListInput extends React.Component {
  state = {
    todo: '',
    starred: false,
  };

  render() {
    const { todo, starred } = this.state;

    return (
      <View style={styles.container}>
        <View style={[styles.placeholder, { paddingTop: 2 }]}>
          <IonIcon name="ios-add-outline" size={32} color="white" />
        </View>

        <View style={styles.wrap}>
          <Input
            value={todo}
            style={styles.title}
            returnKeyType="done"
            placeholder="Adicionar uma tarefa..."
            placeholderTextColor="white"
            onChangeText={text => this.setState({ todo: text })}
          />
        </View>

        <Button transparent style={styles.placeholder}>
          <IonIcon
            size={20}
            color="white"
            name={`ios-star${starred ? '' : '-outline'}`}
          />
        </Button>
      </View>
    );
  }
}

export default TodoListInput;
