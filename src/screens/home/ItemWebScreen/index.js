import React from 'react';
import {View} from 'react-native';
import WebView from '../../../common/components/element/webview';
import styles from './styles';

export default function ItemWebScreen(props) {
  const {url = '', isReload, nameScreen = '', keySubScreen = ''} = props;

  return (
    <View style={styles.container}>
      <WebView
        nameScreen={nameScreen}
        isReload={isReload}
        keySubScreen={keySubScreen}
        url={url || 'https://www.dechau.com'}
      />
    </View>
  );
}
