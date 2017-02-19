import React from 'react';
import { times } from 'lodash';
import { Dimensions, ScrollView, Text, TouchableHighlight, View } from 'react-native';
// import { Content, ListItem } from 'native-base';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import MdIcon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const styles = {
  container: {
    backgroundColor: 'white',
    flex: 1,
    height,
    width,
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
  },
  itemIcon: {
    fontSize: 18,
    marginTop: 2,
    textAlign: 'center',
    width: 48,
  },
  itemText: {
    color: '#777',
    flex: 1,
    fontSize: 16,
  },
  footer: {
    borderStyle: 'solid',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    marginBottom: 25,
  },
};

const Sidebar = () => (
  <View style={styles.container}>
    <ScrollView scrollsToTop={false} style={{ flex: 1 }}>
      <TouchableHighlight underlayColor="rgba(0,0,0, 0.1)" onPress={() => 0}>
        <View style={styles.item}>
          <FontIcon name="inbox" style={styles.itemIcon} />
          <Text style={styles.itemText}>
            Caixa de entrada
          </Text>
        </View>
      </TouchableHighlight>
      {times(25).map(idx =>
        <TouchableHighlight key={idx} underlayColor="rgba(0,0,0, 0.1)" onPress={() => 0}>
          <View style={styles.item}>
            <MdIcon name="format-list-bulleted" style={{ ...styles.itemIcon, fontSize: 19 }} />
            <Text style={styles.itemText}>
              Caixa de entrada
            </Text>
          </View>
        </TouchableHighlight>,
      )}
    </ScrollView>
    <View style={styles.footer}>
      <TouchableHighlight underlayColor="rgba(0,0,0, 0.1)" onPress={() => 0}>
        <View style={styles.item}>
          <FontIcon name="plus" style={styles.itemIcon} />
          <Text style={styles.itemText}>
            Criar Lista
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  </View>
);

// Sidebar.propTypes = {
//   navigator: React.PropTypes.object.isRequired,
//   route: React.PropTypes.object.isRequired,
// };

export default Sidebar;
