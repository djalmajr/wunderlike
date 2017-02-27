import React, { Component } from 'react';
import { Dimensions, Image } from 'react-native';
import { Drawer } from 'native-base';
import bgImage from '../../assets/bg.jpg';

const { width, height } = Dimensions.get('window');

const styles = {
  background: {
    width,
    height,
    resizeMode: 'cover',
    backgroundColor: '#eee',
  },
};

class DrawerContainer extends Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    menu: React.PropTypes.node.isRequired,
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

  handleCloseDrawer = () => {
    this.drawer._root.close();
  };

  handleOpenDrawer = () => {
    this.drawer._root.open();
  };

  render() {
    const { children, menu } = this.props;

    return (
      <Image style={styles.background} source={bgImage}>
        <Drawer
          content={menu}
          ref={ref => (this.drawer = ref)}
          onClose={this.handleCloseDrawer}
        >
          {children}
        </Drawer>
      </Image>
    );
  }
}

export default DrawerContainer;
