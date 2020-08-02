import React from 'react';
import {View, Image} from 'react-native';
import {images} from '../../platform';
import styles from './styles';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={images.dplus_logo} />
      </View>
    </View>
  );
};
export default SplashScreen;
