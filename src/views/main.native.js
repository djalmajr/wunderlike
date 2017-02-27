import React, { Component } from 'react';
import { BackAndroid, Navigator } from 'react-native';
import Todos from './containers/todos';

const initialRoute = { key: 'todos' };

class Main extends Component {
  static childContextTypes = {
    addBackButtonListener: React.PropTypes.func,
    removeBackButtonListener: React.PropTypes.func,
  };

  getChildContext() {
    return {
      addBackButtonListener: this.handleAddBackButtonListener,
      removeBackButtonListener: this.handleRemoveBackButtonListener,
    };
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleAddBackButtonListener = (listener) => {
    this.handlers.push(listener);
  };

  handleRemoveBackButtonListener = (listener) => {
    this.handlers = this.handlers.filter(handler => handler !== listener);
  };

  handleBackButton = () => {
    for (let i = this.handlers.length - 1; i >= 0; i -= 1) {
      if (this.handlers[i]()) {
        return true;
      }
    }

    if (this.navigator && this.navigator.getCurrentRoutes().length > 1) {
      this.navigator.pop();

      return true;
    }

    return false;
  };

  handlers = [];

  render() {
    return (
      <Navigator
        ref={el => (this.navigator = el)}
        initialRoute={initialRoute}
        renderScene={(r, nav) => <Todos route={r} navigator={nav} />}
        configureScene={() => Navigator.SceneConfigs.PushFromRight}
      />
    );
  }
}

export default Main;
