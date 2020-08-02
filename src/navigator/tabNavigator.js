import * as React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home';
import ScheduleScreen from '../screens/schedule';
import LocationScreen from '../screens/location';
import MyPageScreen from '../screens/mypage';
import VideoScreen from '../screens/video';
import {colors} from '../platform';
import {TAB_BAR, TAB_NAME} from '../configs/constants';
import styles from './styles';
import {onScrollTop} from '../actions/controllerActions';
let lastOnPress = 0;
function MyTabBar({state, descriptors, navigation}) {
  const dispatch = useDispatch();

  return (
    <>
      <View style={styles.tab}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
            if (isFocused && !event.defaultPrevented) {
              if (route.name !== 'home') {
                dispatch(onScrollTop(route.name));
              }
              if (route.name === 'home') {
                if (isFocused) {
                  dispatch(onScrollTop(route.name));
                }
              }
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                styles.tabItem,
                {backgroundColor: isFocused ? colors.black : null},
              ]}>
              <Image
                style={isFocused ? styles.iconActive : styles.icon}
                source={TAB_BAR[index].icon}
              />
              <Text style={isFocused ? styles.labelActive : styles.label}>
                {TAB_BAR[index].label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
}
const Tab = createBottomTabNavigator();
export const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen name={TAB_NAME.home} component={HomeScreen} />
      <Tab.Screen name={TAB_NAME.schedule} component={ScheduleScreen} />
      <Tab.Screen name={TAB_NAME.location} component={LocationScreen} />
      <Tab.Screen name={TAB_NAME.video} component={VideoScreen} />
      <Tab.Screen name={TAB_NAME.mypage} component={MyPageScreen} />
    </Tab.Navigator>
  );
};
