import {StyleSheet, Platform} from 'react-native';
import {colors} from '../../../../platform';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    height: 42,
  },
  tabBar: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  tabBarItem: {
    borderRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.black,
    paddingVertical: 2,
  },
  tabBarItemActive: {
    borderRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    paddingVertical: 2,
  },
  label: {
    fontSize: Platform.OS === 'ios' ? 12.5 : 12,
    color: colors.white,
  },
  labelActive: {
    fontSize: 12,
    color: colors.black,
  },
});
