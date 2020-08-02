import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TabNavigator} from './tabNavigator';

const Stack = createStackNavigator();

export const HomeStack = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="TabNavigator" component={TabNavigator} />
  </Stack.Navigator>
);
