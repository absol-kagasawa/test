import React, {useState, useRef, useEffect} from 'react';
import {View, SafeAreaView, StatusBar, Linking} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import WebViewModal from '../webViewModal';
import Loading from '../loading';
import {onReloadScreenSubDone} from '../../../../actions/controllerActions';
import styles from './styles';

let keyReload = 0;

export default function WebViewCustom({
  url,
  isReload,
  keyScreenActive,
  keySubScreen,
}) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [urlModal, setUrlModal] = useState('');
  const controllerReducer = useSelector((state) => state.controllerReducer);
  const {screen = '', keyScreen = '', typeOnLoad, onScroll} =
    controllerReducer || {};
  const webViewRef = useRef();

  const navigation = useNavigation();
  const onScrollTop = `try {
    setTimeout(function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 100);
  } catch (e) {
    console.log(e);
    true;
  }
  true;
`;
  useEffect(() => {
    if (keyScreen === keySubScreen && typeOnLoad === 'sub') {
      keyReload = keyReload + 1;
      dispatch(onReloadScreenSubDone());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controllerReducer]);

  useEffect(() => {
    if (screen === 'home' && onScroll) {
      webViewRef.current.injectJavaScript(onScrollTop);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controllerReducer]);

  const onOpen = async (linkUrl) => {
    const supported = await Linking.canOpenURL(linkUrl);
    if (supported) {
      await Linking.openURL(linkUrl);
    }
  };
  return (
    <>
      {/* <StatusBar barStyle="dark-content" backgroundColor="white" /> */}
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <View style={styles.webview}>
              <WebView
                // onNavigationStateChange={_onNavigationStateChange}
                // onLoadStart={_onLoadStart}
                // onLoadEnd={_onLoadEnd}
                // startInLoadingState={true}
                // javaScriptEnabled={true}
                // userAgent="/ dechau_iosapp"
                // onLoadProgress={_onLoadProgress}
                decelerationRate={0.998}
                key={keyReload}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                javaScriptEnabledAndroid={true}
                style={styles.webview}
                ref={(ref) => (webViewRef.current = ref)}
                source={{uri: url}}
                startInLoadingState={true}
                renderLoading={() => <Loading />}
                onShouldStartLoadWithRequest={(request) => {
                  const urlResult = request.url.toString();
                  if (!urlResult.includes('https://www.dechau.com/')) {
                    onOpen(request.url);
                    // setUrlModal(request.url);
                    // setVisible(true);
                    return false;
                  } else if (
                    urlResult.includes('/schedule/schedule_all.php?')
                  ) {
                    navigation.navigate('schedule', {
                      url: request.url,
                    });
                    return false;
                  } else if (
                    urlResult.includes('news/single.php') ||
                    urlResult.includes('movie/single.php') ||
                    urlResult.includes('special/contents/') ||
                    urlResult.includes('hall/single.php') ||
                    urlResult.includes('machine/single.php') ||
                    urlResult.includes('special/ws') ||
                    urlResult.includes('special/Amy/') ||
                    urlResult.includes('member/single.php')
                  ) {
                    setUrlModal(request.url);
                    setVisible(true);
                    return false;
                  } else if (urlResult.includes('movie/?area=')) {
                    navigation.navigate('video', {
                      url: request.url,
                    });
                    return false;
                  } else if (urlResult.includes('movie/index.php?free')) {
                    navigation.navigate('video', {
                      url: request.url,
                    });
                    return false;
                  } else if (urlResult.includes('hall/index.php?free=')) {
                    navigation.navigate('location', {
                      url: request.url,
                    });
                    return false;
                  } else if (urlResult.includes('hall/?free=')) {
                    navigation.navigate('location', {
                      url: request.url,
                    });
                    return false;
                  } else {
                    return request.url.startsWith('https://www.dechau.com/');
                  }
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>
      <WebViewModal
        isModalVisible={visible}
        onClose={() => {
          setVisible(false);
        }}
        url={urlModal}
      />
    </>
  );
}
