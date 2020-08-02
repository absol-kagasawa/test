import React from 'react';
import {SafeAreaView, View} from 'react-native';
import styles from './styles';

export default function Container({children}) {
  return (
    <React.Fragment>
      <SafeAreaView style={styles.top} />
      <SafeAreaView style={styles.bottom}>
        <View style={styles.children}>{children}</View>
      </SafeAreaView>
    </React.Fragment>
  );
}
