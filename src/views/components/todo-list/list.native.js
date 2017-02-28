import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import { View } from 'react-native';
import { Button, List, Text } from 'native-base';

const styles = {
  btn: {
    alignSelf: 'center',
    backgroundColor: 'rgba(88,141,100,0.85)',
    marginVertical: 20,
  },
  btnText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 10,
  },
};

class TodoList extends Component {
  state = {
    showCompleted: false,
  };

  handleToggle = () => {
    this.setState({ showCompleted: !this.state.showCompleted });
  };

  render() {
    const { showCompleted } = this.state;
    const { completedIds, uncompletedIds, renderItem, renderInput } = this.props;

    return (
      <View style={styles.content}>
        {renderInput()}
        <View style={{ flexDirection: 'column-reverse' }}>
          <List dataArray={uncompletedIds} renderRow={id => renderItem(id)} />
        </View>
        {!isEmpty(completedIds) && (
          <Button small transparent style={styles.btn} onPress={this.handleToggle}>
            <Text style={styles.btnText}>
              {`${showCompleted ? 'ESCONDER' : 'MOSTRAR'} TAREFAS CONCLUÍDAS`}
            </Text>
          </Button>
        )}
        {showCompleted && (
          <View style={{ flexDirection: 'column-reverse' }}>
            <List dataArray={completedIds} renderRow={id => renderItem(id)} />
          </View>
        )}
      </View>
    );
  }
}

TodoList.propTypes = {
  completedIds: React.PropTypes.array.isRequired,
  uncompletedIds: React.PropTypes.array.isRequired,
  renderInput: React.PropTypes.any.isRequired,
  renderItem: React.PropTypes.any.isRequired,
};

export default TodoList;
