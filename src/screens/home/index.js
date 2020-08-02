import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {TabView} from 'react-native-tab-view';
import {useDispatch} from 'react-redux';
import {getWebTaskList, getToken} from '../../utils/managerStorage';
import TabBar from '../../common/components/widgets/tabBar';
import {getLocation} from '../../services/getLocation';
import ItemWebScreen from './ItemWebScreen';
import {onReloadScreenSub} from '../../actions/controllerActions';
import {BASE_URL} from '../../configs/urlApi';
// import styles from './styles';
import Container from '../../common/components/layouts/container';
const initialLayout = {width: Dimensions.get('window').width};

export default function TabViewExample({route, navigation}) {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [isReload, setReload] = useState(false);
  const [routes, setRoutes] = useState([]);
  const {name = ''} = route || {};
  const onSetIndex = (key, indexItem) => {
    setIndex(indexItem);
    const paramAction = {
      key: key,
      typeReload: 'sub',
    };
    dispatch(onReloadScreenSub(paramAction));
    setReload(!isReload);
  };
  const renderScene = (props) => {
    return (
      <ItemWebScreen
        url={props.route.url}
        nameScreen={name}
        isReload={isReload}
        keySubScreen={props.route.key}
      />
    );
  };
  useEffect(() => {
    const onGetWebTaskList = async () => {
      try {
        const web_task_list = await getWebTaskList();
        const app_token = await getToken();
        if (web_task_list) {
          let arrayScreen = web_task_list;
          arrayScreen = arrayScreen.map((item) => {
            return {
              key: item.area_id.toString(),
              title: item.title,
              url: item.url + '?app_token=' + app_token,
            };
          });
          setRoutes(arrayScreen);
        } else {
          setRoutes([
            {
              key: 'top',
              url: BASE_URL + '?app_token=' + app_token,
              title: 'TOP',
            },
            {
              key: 'screen1',
              url: BASE_URL + 'touhoku/?app_token=' + app_token,
              title: '北海道・東北',
            },
            {
              key: 'screen2',
              url: BASE_URL + 'kitakanto/?app_token=' + app_token,
              title: '北関東',
            },
            {
              key: 'screen3',
              url: BASE_URL + 'kanto/?app_token=' + app_token,
              title: '関東',
            },
            {
              key: 'screen4',
              url: BASE_URL + 'hokuriku/?app_token=' + app_token,
              title: '北陸・甲信越',
            },
            {
              key: 'screen5',
              url: BASE_URL + 'toukai/?app_token=' + app_token,
              title: '東海',
            },
            {
              key: 'screen6',
              url: BASE_URL + 'shiga_kyout/?app_token=' + app_token,
              title: '滋賀・京都',
            },
            {
              key: 'screen7',
              url: BASE_URL + 'kansai/?app_token' + app_token,
              title: '関西',
            },
            {
              key: 'screen8',
              url: BASE_URL + 'kyushu/?app_token=' + app_token,
              title: '九州・山口',
            },
            {
              key: 'screen9',
              url: BASE_URL + 'minamikyush/?app_token=' + app_token,
              title: '熊本・鹿児島・宮崎',
            },
          ]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    onGetWebTaskList();
    getLocation();
  }, []);

  return (
    <Container
      children={
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          tabBarPosition="bottom"
          bounces
          lazy={true}
          lazyPreloadDistance={0}
          swipeEnabled={false}
          scrollEnabled={false}
          renderTabBar={(props) => {
            const {navigationState} = props;
            return (
              <TabBar
                navigationState={navigationState}
                setIndex={(key, indexItem) => onSetIndex(key, indexItem)}
              />
            );
          }}
        />
      }
    />
  );
}
