import React from 'react';
import { times } from 'lodash';
import { Text, View } from 'react-native';
import { Button, Content, List, ListItem } from 'native-base';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import MdIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import OctIcon from 'react-native-vector-icons/Octicons';
import Fab from '../components/fab';

const styles = {
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    marginBottom: 25,
  },
  header: {
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    height: 50,
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
    fontSize: 18,
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
};

const items = times(25).map(id => ({ id, title: 'Lista personalizada' }));

const Sidebar = () => (
  <View style={styles.container}>
    <View style={styles.header}>
      <FontIcon name="user-circle-o" style={styles.headerUserPic} />
      <Text style={{ flex: 1 }}>Djalma Júnior</Text>
      <Button transparent style={{ marginTop: 2 }} onPress={() => 0}>
        <IonIcon name="ios-notifications-outline" style={styles.headerIcon} />
      </Button>
      <Button transparent style={{ marginTop: 2 }} onPress={() => 0}>
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
    <Fab icon="md-add" style={{ backgroundColor: '#2B88D9' }} containerStyle={{ bottom: 10, right: 10 }}>
      <Button style={{ backgroundColor: '#3B5998' }}>
        <MdIcon name="format-list-bulleted" style={{ ...styles.itemIcon, color: 'white', fontSize: 19 }} />
        <Text>Nova Lista</Text>
      </Button>
      <Button style={{ backgroundColor: '#34A34F' }}>
        <OctIcon name="checklist" style={{ ...styles.itemIcon, color: 'white', fontSize: 19 }} />
      </Button>
    </Fab>
  </View>
);

// Sidebar.propTypes = {
//   navigator: React.PropTypes.object.isRequired,
//   route: React.PropTypes.object.isRequired,
// };

export default Sidebar;
