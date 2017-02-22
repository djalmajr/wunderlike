import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Content, List } from 'native-base';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import * as selectors from '../../../store/selectors';
import MenuItem from './menu-item';

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
    height: 56,
    flexDirection: 'row',
    borderColor: '#ddd',
    borderBottomWidth: StyleSheet.hairlineWidth,
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
};

const Menu = ({ listId, lists }) => (
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
      <MenuItem
        badge="25"
        color="#2B88D9"
        title="Caixa de Entrada"
        iconName="ios-filing-outline"
        selected={listId === 'inbox'}
      />
      <List
        dataArray={lists}
        renderRow={list => (
          <MenuItem
            key={list.id}
            title={list.title}
            iconName="ios-list"
            selected={listId === list.id}
          />
        )}
      />
    </Content>
    <MenuItem
      color="#2B88D9"
      iconName="ios-add"
      title="Nova Lista"
      style={{ borderTopWidth: StyleSheet.hairlineWidth }}
    />
  </View>
);

Menu.propTypes = {
  // navigator: React.PropTypes.object.isRequired,
  // route: React.PropTypes.object.isRequired,
  lists: React.PropTypes.array.isRequired,
  listId: React.PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  lists: [],
  listId: selectors.getSelectedListId(state),
});

export default connect(mapStateToProps)(Menu);
