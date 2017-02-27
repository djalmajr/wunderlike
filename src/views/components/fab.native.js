import React, { Component } from 'react';
import { Fab, Icon } from 'native-base';

class FABtn extends Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    direction: React.PropTypes.string,
    icon: React.PropTypes.string.isRequired,
    position: React.PropTypes.string,
    style: React.PropTypes.object,
  };

  static defaultProps = {
    direction: 'up',
    position: 'bottomRight',
    style: {},
  };

  state = {
    active: false,
  };

  handlePress = () => {
    this.setState({ active: !this.state.active });
  };

  render() {
    const { active } = this.state;
    const { children, icon, ...props } = this.props;

    return (
      <Fab {...props} active={active} onPress={this.handlePress}>
        <Icon name={icon} />
        {children}
      </Fab>
    );
  }
}

export default FABtn;
