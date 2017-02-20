import React from 'react';
import { times } from 'lodash';
import { Text, View } from 'react-native';
import { Button, Content, List, ListItem } from 'native-base';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import MdIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import OctIcon from 'react-native-vector-icons/Octicons';
import ActionButton from 'react-native-action-button';

const styles = {
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    marginBottom: 25,
  },
  fabBtnIcon: {
    color: 'white',
    fontSize: 20,
  },
  header: {
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    height: 56,
    flexDirection: 'row',
    borderColor: '#ddd',
    borderBottomWidth: 1,
  },
  headerUserPic: {
    fontSize: 28,
    marginHorizontal: 10,
    marginTop: 2,
  },
  headerIcon: {
    fontSize: 22,
    marginTop: 2,
  },
  item: {
    borderBottomWidth: 0,
    marginLeft: 0,
  },
  itemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemIcon: {
    fontSize: 18,
    marginTop: 2,
    textAlign: 'center',
    width: 48,
  },
  itemText: {
    color: '#777',
    fontSize: 16,
  },
  shadow: {
    elevation: 6,
    shadowOpacity: 0.3,
    shadowColor: '#000',
    shadowRadius: 4,
    shadowOffset: {
      width: 0, height: 8,
    },
  },
};

const items = times(25).map(id => ({ id, title: 'Lista personalizada' }));

const Sidebar = () => (
  <View style={styles.container}>
    <View style={styles.header}>
      <FontIcon name="user-circle-o" style={styles.headerUserPic} />
      <Text style={{ flex: 1, fontSize: 16 }}>Djalma Júnior</Text>
      <Button transparent style={{ marginTop: 5 }} onPress={() => 0}>
        <IonIcon name="ios-notifications-outline" style={styles.headerIcon} />
      </Button>
      <Button transparent style={{ marginTop: 5 }} onPress={() => 0}>
        <IonIcon name="ios-search" style={styles.headerIcon} />
      </Button>
    </View>
    <Content style={{ padding: 0 }}>
      <ListItem onPress={() => 0} style={styles.item}>
        <View style={styles.itemContainer}>
          <FontIcon name="inbox" style={styles.itemIcon} />
          <Text style={styles.itemText}>Caixa de entrada</Text>
        </View>
      </ListItem>
      <List
        dataArray={items}
        renderRow={item => (
          <ListItem key={item.id} onPress={() => 0} style={styles.item}>
            <View style={styles.itemContainer}>
              <MdIcon name="format-list-bulleted" style={{ ...styles.itemIcon, fontSize: 19 }} />
              <Text style={styles.itemText}>{item.title}</Text>
            </View>
          </ListItem>
        )}
      />
    </Content>
    <ActionButton
      size={56}
      position="right"
      bgColor="rgba(255,255,255,0.7)"
      buttonColor="rgba(43,136,217,1)"
      icon={<IonIcon name="md-add" style={styles.fabBtnIcon} />}
    >
      <ActionButton.Item
        hideShadow
        size={48}
        title="Nova Tarefa"
        buttonColor="#34A34F"
        style={styles.shadow}
        textContainerStyle={{ backgroundColor: '#f5f5f5', borderColor: 'rgba(0,0,0,0.23)' }}
        onPress={() => 0}
      >
        <OctIcon name="checklist" style={styles.fabBtnIcon} />
      </ActionButton.Item>
      <ActionButton.Item
        hideShadow
        size={48}
        buttonColor="#3B5998"
        title="Nova Lista"
        style={styles.shadow}
        textContainerStyle={{ backgroundColor: '#f5f5f5', borderColor: 'rgba(0,0,0,0.23)' }}
        onPress={() => 0}
      >
        <MdIcon name="format-list-bulleted" style={styles.fabBtnIcon} />
      </ActionButton.Item>
    </ActionButton>
  </View>
);

// Sidebar.propTypes = {
//   navigator: React.PropTypes.object.isRequired,
//   route: React.PropTypes.object.isRequired,
// };

export default Sidebar;
