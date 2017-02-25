import React from 'react';
import { connect } from 'react-redux';
import { Dimensions, Image } from 'react-native';
import { Body, Button, Container, Content, Drawer, Header, Left, Right, Title } from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MdIcon from 'react-native-vector-icons/MaterialIcons';
// import Perf from 'react-native/Libraries/Performance/RCTRenderingPerf';
import * as actionCreators from '../../store/actions';
import * as selectors from '../../store/selectors';
import TodoList from '../components/todo-list';
import Menu from './menu';

const { width, height } = Dimensions.get('window');

const styles = {
  background: {
    width,
    height,
    resizeMode: 'cover',
    backgroundColor: '#eee',
  },
};

class Todos extends React.Component {
  static propTypes = {
    completedTodos: React.PropTypes.array.isRequired,
    incompletedTodos: React.PropTypes.array.isRequired,
    navigator: React.PropTypes.object.isRequired,
    route: React.PropTypes.object.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onToggleCompleted: React.PropTypes.func.isRequired,
    onToggleStarred: React.PropTypes.func.isRequired,
  };

  static childContextTypes = {
    closeDrawer: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
  };

  getChildContext() {
    return {
      closeDrawer: this.handleCloseDrawer,
      openDrawer: this.handleOpenDrawer,
    };
  }

  // componentDidMount() {
  //   Perf.toggle();
  //   Perf.start();
  //   setTimeout(() => Perf.stop(), 60000);
  // }

  handleCloseDrawer = () => {
    this.drawer._root.close();
  };

  handleOpenDrawer = () => {
    this.drawer._root.open();
  };

  render() {
    const {
      completedTodos,
      incompletedTodos,
      navigator,
      route,
      onDelete,
      onSave,
      onToggleCompleted,
      onToggleStarred,
    } = this.props;

    return (
      <Image style={styles.background} source={require('../../assets/bg.jpg')}>
        <Drawer
          ref={(ref) => { this.drawer = ref; }}
          content={<Menu navigator={navigator} route={route} />}
          onClose={this.handleCloseDrawer}
        >
          <Container>
            <Header androidStatusBarColor="#3D523C" style={{ backgroundColor: '#668964' }}>
              <Left>
                <Button transparent onPress={this.handleOpenDrawer}>
                  <IonIcon name="md-menu" color="white" size={26} />
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
                onDelete={onDelete}
                onSave={onSave}
                onToggleCompleted={onToggleCompleted}
                onToggleStarred={onToggleStarred}
              />
            </Content>
          </Container>
        </Drawer>
      </Image>
    );
  }
}

const mapStateToProps = state => ({
  completedTodos: selectors.getCompletedTodos(state),
  incompletedTodos: selectors.getIncompletedTodos(state),
});

const mapDispatchToProps = (dispatch, { selectedListId }) => ({
  onDelete: todo => dispatch(actionCreators.deleteTodo(todo)),
  onSave: todo => dispatch(actionCreators.saveTodo({ ...todo, listId: selectedListId })),
  onToggleCompleted: todo => dispatch(actionCreators.toggleCompleted(todo)),
  onToggleStarred: todo => dispatch(actionCreators.toggleStarred(todo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
