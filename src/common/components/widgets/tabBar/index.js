import React from 'react';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import styles from './styles';

const TabBar = ({navigationState, setIndex}) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {navigationState.routes.map((item, indexItem) => (
          <TouchableOpacity
            onPress={() => {
              setIndex(item.key, indexItem);
            }}
            key={indexItem}
            style={styles.tabBar}>
            <View
              style={
                navigationState.index === indexItem
                  ? styles.tabBarItemActive
                  : styles.tabBarItem
              }>
              <Text
                style={
                  navigationState.index === indexItem
                    ? styles.labelActive
                    : styles.label
                }>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default TabBar;
