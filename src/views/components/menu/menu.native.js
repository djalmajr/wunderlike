import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { /* Button, */ Content, List } from 'native-base';
import FontIcon from 'react-native-vector-icons/FontAwesome';
// import IonIcon from 'react-native-vector-icons/Ionicons';
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

const Menu = ({ currListId, lists, todoIdsInList, onMenuPress }) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <FontIcon name="user-circle-o" style={styles.headerUserPic} />
      <Text style={{ flex: 1, fontSize: 16 }}>Djalma Júnior</Text>
      {/*
      <Button transparent style={{ marginTop: 5 }} onPress={() => 0}>
        <IonIcon name="ios-notifications-outline" style={styles.headerIcon} />
      </Button>
      <Button transparent style={{ marginTop: 5 }} onPress={() => 0}>
        <IonIcon name="ios-search" style={styles.headerIcon} />
      </Button>
      */}
    </View>
    <Content style={{ padding: 0 }}>
      <MenuItem
        id="inbox"
        color="#2B88D9"
        title="Caixa de Entrada"
        iconName="ios-filing-outline"
        badge={todoIdsInList.inbox.length}
        selected={currListId === 'inbox'}
        onPress={onMenuPress}
      />
      <List
        dataArray={lists}
        renderRow={list => (
          <MenuItem
            key={list.id}
            id={list.id}
            title={list.title}
            iconName="ios-list"
            selected={currListId === list.id}
            onPress={onMenuPress}
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
  currListId: React.PropTypes.string.isRequired,
  lists: React.PropTypes.array.isRequired,
  todoIdsInList: React.PropTypes.object.isRequired,
  onMenuPress: React.PropTypes.func.isRequired,
};

export default Menu;
