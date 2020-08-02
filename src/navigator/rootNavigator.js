import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashNativeScreen from 'react-native-splash-screen';
import {getToken} from '../utils/managerStorage';
import {getAppToken} from '../services/getToken';
import {HomeStack} from './homeStack';
import {getWebTasKList} from '../services/getWebViewTaskList';
import SplashScreen from '../screens/splash';
import {Platform} from 'react-native';
import Container from '../common/components/layouts/container';

const RootStack = createStackNavigator();

export const RootNavigator = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        let access_token;
        access_token = await getToken();
        if (access_token) {
          getWebTasKList(access_token);
        } else {
          await getAppToken();
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    bootstrapAsync();
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Platform.OS === 'ios') {
        SplashNativeScreen.hide();
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <Container
      children={
        <RootStack.Navigator
          headerMode="none"
          mode="modal"
          screenOptions={{animationEnabled: false}}>
          <RootStack.Screen name="HomeStack" component={HomeStack} />
        </RootStack.Navigator>
      }
    />
  );
};
