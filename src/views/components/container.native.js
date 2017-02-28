import React from 'react';
import { Body, Button, Container, Content, Header, Left, Right, Title } from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MdIcon from 'react-native-vector-icons/MaterialIcons';

const ContainerWithHeader = ({ children, icon, title, onMenuPress }) => (
  <Container>
    <Header androidStatusBarColor="#3D523C" style={{ backgroundColor: '#668964' }}>
      <Left>
        <Button transparent onPress={onMenuPress}>
          {icon}
        </Button>
      </Left>
      <Body>
        <Title>{title}</Title>
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
      {children}
    </Content>
  </Container>
);

ContainerWithHeader.propTypes = {
  children: React.PropTypes.node.isRequired,
  icon: React.PropTypes.node,
  title: React.PropTypes.string.isRequired,
  onMenuPress: React.PropTypes.func,
};

ContainerWithHeader.defaultProps = {
  icon: <IonIcon name="md-menu" color="white" size={26} />,
  onMenuPress: () => 0,
};

export default ContainerWithHeader;
