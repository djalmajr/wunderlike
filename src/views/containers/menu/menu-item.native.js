import React from 'react';
import { merge } from 'lodash';
import { Text, View } from 'react-native';
import { ListItem } from 'native-base';
import IonIcon from 'react-native-vector-icons/Ionicons';

const styles = {
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  badge: {
    color: '#777',
    fontSize: 12,
  },
  icon: {
    color: '#777',
    fontSize: 24,
    marginTop: 3,
    textAlign: 'center',
    width: 48,
  },
  listItem: {
    borderBottomWidth: 0,
    marginLeft: 0,
  },
  selected: {
    backgroundColor: '#2B88D9',
  },
  text: {
    color: '#777',
    fontSize: 16,
    flex: 1,
  },
};

const MenuItem = ({ color, selected, ...props }) => {
  const badgeStl = [styles.badge, props.badgeStyle, !!color && { color }, selected && { color: 'white' }];
  const textStl = [styles.text, props.textStyle, !!color && { color }, selected && { color: 'white' }];
  const iconStl = [styles.icon, props.iconStyle, !!color && { color }, selected && { color: 'white' }];

  return (
    <View style={merge(selected ? styles.selected : {})}>
      <ListItem style={merge({}, styles.listItem, props.style)} onPress={props.onPress}>
        <View style={styles.container}>
          <IonIcon name={props.iconName} style={iconStl} />
          <Text style={textStl}>{props.title}</Text>
          {!!props.badge && <Text style={badgeStl}>{props.badge}</Text> }
        </View>
      </ListItem>
    </View>
  );
};

MenuItem.propTypes = {
  badge: React.PropTypes.string,
  badgeStyle: React.PropTypes.object,
  color: React.PropTypes.string,
  iconName: React.PropTypes.string,
  iconStyle: React.PropTypes.object,
  onPress: React.PropTypes.func,
  selected: React.PropTypes.bool,
  style: React.PropTypes.object,
  textStyle: React.PropTypes.object,
  title: React.PropTypes.string,
};

MenuItem.defaultProps = {
  badge: '',
  badgeStyle: {},
  color: '',
  iconName: '',
  iconStyle: {},
  onPress: () => 0,
  selected: false,
  style: {},
  textStyle: {},
  title: '',
};

export default MenuItem;
