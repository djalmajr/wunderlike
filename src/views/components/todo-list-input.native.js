import React from 'react';
import { View } from 'react-native';
import { Button, Input } from 'native-base';
import IonIcon from 'react-native-vector-icons/Ionicons';
import emptyFunction from 'fbjs/lib/emptyFunction';
import Toast from 'react-native-simple-toast';

const size = 50;

const getInitState = () => ({ title: '', starred: false });

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
  static propTypes = {
    onSave: React.PropTypes.func,
  };

  static defaultProps = {
    onSave: emptyFunction,
  };

  state = getInitState();

  handleChange = (title) => {
    this.setState({ title });
  };

  handleStarred = () => {
    this.setState({ starred: !this.state.starred });
  };

  handleSave = () => {
    const { starred, title } = this.state;
    const data = { starred, title: title.trim() };

    if (data.title) {
      this.setState(getInitState(), () => this.props.onSave(data));
    } else {
      Toast.show('Informe um texto para uma nova tarefa.');
    }
  };

  render() {
    const { title, starred } = this.state;

    return (
      <View style={styles.container}>
        <Button
          transparent
          style={{ ...styles.placeholder, paddingTop: 4 }}
          onPress={this.handleSave}
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
            onChangeText={this.handleChange}
            onSubmitEditing={this.handleSave}
          />
        </View>
        <Button transparent style={styles.placeholder} onPress={this.handleStarred}>
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
