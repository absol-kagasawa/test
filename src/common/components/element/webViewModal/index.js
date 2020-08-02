import React, {useState, useRef} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Linking,
  TouchableOpacity,
  Platform,
} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import {WebView} from 'react-native-webview';
import Loading from '../loading';
import styles from './styles';
import {BASE_URL} from '../../../../configs/urlApi';

export default function WebViewModal({url, isModalVisible, onClose}) {
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const webViewRef = useRef();

  const _onGoBack = () => {
    webViewRef.current.goBack();
  };
  const _onGoForward = () => {
    webViewRef.current.goForward();
  };

  const _onNavigationStateChange = (webviewState) => {
    setCanGoBack(webviewState.canGoBack);
    setCanGoForward(webviewState.canGoForward);
    //line接続
    if (webviewState.url.includes(
      'https://social-plugins.line.me/lineit/share?',
    )) {
      webViewRef.current.stopLoading();
      onOpen(webviewState.url);
      return;
    }
    //接続デバイスのチェック
    if (Platform.OS === 'ios') {
      //接続先URLのドメインチェック
      if (webviewState.url.includes(BASE_URL)) {
        if (
          //twitterのシェアかフォローの場合はビューワーから抜ける
          webviewState.url.includes(
            'https://twitter.com/share?url=https://www.dechau',
          )||
          webviewState.url.includes(
            'https://twitter.com/intent',
          )
        ) {
          webViewRef.current.stopLoading();
          onOpen(webviewState.url);
          return;
        }
        return;
      } else {
        if (
          //twitterのシェアかフォローの場合はビューワーから抜ける
          webviewState.url.includes(
            'https://twitter.com/share?url=https://www.dechau',
          )||
            webviewState.url.includes(
              'https://twitter.com/intent',
          )
        ) {
          webViewRef.current.stopLoading();
          onOpen(webviewState.url);
          return;
        }
        webViewRef.current.stopLoading();
        onOpen(webviewState.url);
        return;
      }
    //接続デバイスのチェック
    }else if(Platform.OS === 'android') {
      //twitterのフォローの場合はビューワーから抜ける（シェアの時は別で動作している)
      if (
        webviewState.url.includes(
          'https://twitter.com/intent',
        )
      ) {
        webViewRef.current.stopLoading();
        onOpen(webviewState.url);
        return;
      }
      return;
    } 
  };
  // const navigation = useNavigation();

  const onOpen = async (linkUrl) => {
    const supported = await Linking.canOpenURL(linkUrl);
    if (supported) {
      await Linking.openURL(linkUrl);
    }
  };
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Modal
        animationInTiming={1}
        animationOutTiming={1}
        isVisible={isModalVisible}
        style={styles.modal}>
        <View style={styles.container}>
          <SafeAreaView style={styles.container}>
            <View style={styles.container}>
              <View style={styles.webview}>
                <WebView
                  decelerationRate={0.998}
                  onNavigationStateChange={_onNavigationStateChange}
                  style={styles.webview}
                  javaScriptEnabled
                  ref={(ref) => (webViewRef.current = ref)}
                  source={{uri: url}}
                  startInLoadingState={true}
                  onShouldStartLoadWithRequest={(request) => {
                    if (Platform.OS === 'android') {
                      if (
                        !request.url.includes(BASE_URL) ||
                        request.url.includes(
                          'https://twitter.com/share?url=https://www.dechau',
                        )
                      ) {
                        onOpen(request.url);
                        return false;
                      }
                    }
                    return true;
                  }}
                  renderLoading={() => <Loading />}
                />
              </View>
              <View style={styles.footer}>
                <View style={styles.left}>
                  {canGoBack && (
                    <TouchableOpacity
                      disabled={!canGoBack}
                      onPress={() => {
                        _onGoBack();
                      }}>
                      <Icon
                        name="arrow-left"
                        size={30}
                        color={
                          canGoBack
                            ? 'rgba(30,30,30, 1)'
                            : 'rgba(30,30,30, 0.2)'
                        }
                      />
                    </TouchableOpacity>
                  )}
                  {!canGoBack && (
                    <TouchableOpacity onPress={onClose}>
                      <Icon
                        name="arrow-left"
                        size={30}
                        color={'rgba(30,30,30, 1)'}
                      />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    disabled={!canGoForward}
                    onPress={() => {
                      _onGoForward();
                    }}>
                    <Icon
                      name="arrow-right"
                      size={30}
                      color={
                        canGoForward
                          ? 'rgba(30,30,30, 1)'
                          : 'rgba(30,30,30, 0.2)'
                      }
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.right}>
                  <TouchableOpacity onPress={onClose}>
                    <Icon name="x" size={30} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    </>
  );
}
