import React from 'react';
import { connect } from 'react-redux';
import { Dimensions, Image } from 'react-native';
import { Container, Header, Body, Title, Right, Left, Button, Content } from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MdIcon from 'react-native-vector-icons/MaterialIcons';
import * as selectors from '../../store/selectors';
import TodoList from '../components/todo-list';

const { width, height } = Dimensions.get('window');

const styles = {
  background: {
    width,
    height,
    resizeMode: 'cover',
    backgroundColor: '#eee',
  },
};

const Todos = ({ completedTodos, incompletedTodos }) => (
  <Image style={styles.background} source={require('../../assets/bg.jpg')}>
    <Container>
      <Header androidStatusBarColor="#3D523C" style={{ backgroundColor: '#668964' }}>
        <Left>
          <Button transparent>
            <IonIcon name="md-arrow-back" color="white" size={26} />
          </Button>
        </Left>
        <Body>
          <Title>Caixa de Entrada</Title>
        </Body>
        <Right>
          <Button transparent>
            <MdIcon name="sort-by-alpha" color="white" size={22} />
          </Button>
          <Button transparent>
            <EntypoIcon name="dots-three-vertical" color="white" size={16} />
          </Button>
        </Right>
      </Header>
      <Content>
        <TodoList
          completedTodos={completedTodos}
          incompletedTodos={incompletedTodos}
        />
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
