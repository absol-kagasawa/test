import React, {useEffect, useState} from 'react';
import {View, StatusBar, SafeAreaView, Linking} from 'react-native';
import {useSelector} from 'react-redux';
import WebViewModal from '../../common/components/element/webViewModal';
import {WebView} from 'react-native-webview';
import {getLocation} from '../../utils/managerStorage';
import styles from './styles';
import Loading from '../../common/components/element/loading';
import {BASE_URL} from '../../configs/urlApi';

let keyReload = 0;

const LocationScreen = ({route, navigation}) => {
  const urlBase = BASE_URL + 'hall/';
  const controllerReducer = useSelector((state) => state.controllerReducer);
  const [visible, setVisible] = useState(false);
  const [urlModal, setUrlModal] = useState('');
  const {screen = ''} = controllerReducer || {};
  const [url, setUrl] = useState(urlBase);
  useEffect(() => {
    if (route && route.params && route.params.url) {
      setUrl(route.params.url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params]);
  useEffect(() => {
    const onGetLocation = async () => {
      try {
        const lat_long = await getLocation();
        if (lat_long) {
          const {coords = {}} = lat_long || {};
          const {latitude = 0.0, longitude = 0.0} = coords;
          if (latitude !== null || latitude === 0.0) {
            const urlStr = url + '?lat=' + latitude + '&lng=' + longitude;
            setUrl(urlStr);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (route && route.params && route.params.url) {
    } else {
      onGetLocation();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      if (screen === 'location') {
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
export default LocationScreen;
