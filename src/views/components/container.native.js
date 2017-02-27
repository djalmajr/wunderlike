import React from 'react';
import { isEmpty } from 'lodash';
import { Body, Button, Container, Content, Header, Left, Right, Title } from 'native-base';
import IonIcon from 'react-native-vector-icons/Ionicons';

const size = 50;

const styles = {
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: size,
    width: size,
  },
  header: {
    backgroundColor: '#668964',
    padding: 0,
  },
};

const ContainerWithHeader = ({ actionButtons, children, icon, title, onIconPress }) => (
  <Container>
    <Header androidStatusBarColor="#3D523C" style={styles.header}>
      <Left>
        <Button transparent style={styles.button} onPress={onIconPress}>
          {icon}
        </Button>
      </Left>
      <Body>
        <Title>{title}</Title>
      </Body>
      {!isEmpty(actionButtons) && (
        <Right>
          {actionButtons.map(btn =>
            <Button key={btn.iconName} transparent style={styles.button} onPress={btn.onPress}>
              {React.createElement(btn.iconComponent, {
                name: btn.iconName,
                size: btn.iconSize,
                color: btn.iconColor || 'white',
              })}
            </Button>,
          )}
        </Right>
      )}
    </Header>
    <Content>
      {children}
    </Content>
  </Container>
);

ContainerWithHeader.propTypes = {
  actionButtons: React.PropTypes.array,
  children: React.PropTypes.node.isRequired,
  icon: React.PropTypes.node,
  title: React.PropTypes.string.isRequired,
  onIconPress: React.PropTypes.func,
};

ContainerWithHeader.defaultProps = {
  actionButtons: [],
  icon: <IonIcon name="md-menu" color="white" size={26} />,
  onIconPress: () => 0,
};

export default ContainerWithHeader;
