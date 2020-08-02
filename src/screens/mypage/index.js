import React, {useEffect, useState} from 'react';
import {View, StatusBar, SafeAreaView, Linking} from 'react-native';
import {useSelector} from 'react-redux';
import WebViewModal from '../../common/components/element/webViewModal';
import styles from './styles';
import {WebView} from 'react-native-webview';
import Loading from '../../common/components/element/loading';
import {BASE_URL} from '../../configs/urlApi';

let keyReload = 0;

const MayPageScreen = ({navigation}) => {
  const url = BASE_URL + 'my_page/';
  const controllerReducer = useSelector((state) => state.controllerReducer);
  const [visible, setVisible] = useState(false);
  const [urlModal, setUrlModal] = useState('');
  const {screen = ''} = controllerReducer || {};
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      if (screen === 'mypage') {
        keyReload = keyReload + 1;
      }
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controllerReducer, navigation]);
  const onOpen = async (linkUrl) => {
    const supported = await Linking.canOpenURL(linkUrl);
    if (supported) {
      await Linking.openURL(linkUrl);
    }
  };
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.container}>
            <WebView
              decelerationRate={0.998}
              key={keyReload}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              javaScriptEnabledAndroid={true}
              style={styles.webview}
              source={{uri: url}}
              startInLoadingState={true}
              renderLoading={() => <Loading />}
              onShouldStartLoadWithRequest={(request) => {
                console.log('request.url', request.url);
                const urlResult = request.url.toString();
                if (!urlResult.includes(BASE_URL)) {
                  onOpen(request.url);
                  // setUrlModal(request.url);
                  // setVisible(true);
                  return false;
                } else if (
                  urlResult.includes('/schedule/schedule_all.php?area')
                ) {
                  navigation.navigate('schedule');
                  return false;
                } else if (
                  urlResult.includes('news/single.php') ||
                  urlResult.includes('movie/single.php') ||
                  urlResult.includes('special/contents/') ||
                  urlResult.includes('hall/single.php') ||
                  urlResult.includes('machine/single.php') ||
                  urlResult.includes('special/ws') ||
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
                } else {
                  return request.url.startsWith(BASE_URL);
                }
              }}
            />
          </View>
        </View>
      </SafeAreaView>
      <WebViewModal
        isModalVisible={visible}
        onClose={() => {
          setVisible(false);
        }}
        url={urlModal}
      />
    </>
  );
};
export default MayPageScreen;
