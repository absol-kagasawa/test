import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import styles from './styles';
import {colors} from '../../../../platform';

const Loading = ({color = colors.red, size = 'large'}) => (
  <View style={styles.container}>
    <ActivityIndicator color={color} size={size} />
  </View>
);

export default Loading;
