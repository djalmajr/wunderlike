import React from 'react';
import { connect } from 'react-redux';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { Button, Container, Content, Header, Title } from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MdIcon from 'react-native-vector-icons/MaterialIcons';
import * as selectors from '~/store/selectors';
import TodoList from '../components/todo-list';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    width,
    height,
    resizeMode: 'cover',
    backgroundColor: '#eee',
  },
});

const Todos = ({ completedTodos, incompletedTodos }) => (
  <Image style={styles.background} source={require('~/assets/bg.jpg')}>
    <Container>
      <Header backgroundColor="#668964">
        <Button transparent>
          <IonIcon name="md-arrow-back" color="white" size={26} />
        </Button>
        <Title>Caixa de Entrada</Title>
        <Button transparent>
          <MdIcon name="sort-by-alpha" color="white" size={22} />
        </Button>
        <Button transparent>
          <EntypoIcon name="dots-three-vertical" color="white" size={16} />
        </Button>
      </Header>
      <Content>
        <TodoList completedTodos={completedTodos} incompletedTodos={incompletedTodos} />
      </Content>
    </Container>
  </Image>
);

Todos.propTypes = {
  completedTodos: React.PropTypes.array,
  incompletedTodos: React.PropTypes.array,
};

Todos.defaultProps = {
  completedTodos: [],
  incompletedTodos: [],
};

const mapStateToProps = state => ({
  completedTodos: selectors.getCompletedTodos(state),
  incompletedTodos: selectors.getIncompletedTodos(state),
});

export default connect(mapStateToProps)(Todos);
