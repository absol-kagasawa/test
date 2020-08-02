import {StyleSheet} from 'react-native';
import {colors} from '../platform';
export default StyleSheet.create({
  tab: {
    flexDirection: 'row',
    backgroundColor: colors.bgTab,
    height: 52,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 5,
    backgroundColor: colors.bgTab,
  },
  icon: {
    height: 20,
    width: 20,
    tintColor: colors.white,
  },
  iconActive: {
    height: 22.5,
    width: 22.5,
    tintColor: colors.red,
  },
  label: {
    fontSize: 11,
    color: colors.white,
    marginTop: 5,
    textAlign: 'center',
  },
  labelActive: {
    fontSize: 11,
    color: colors.red,
    marginTop: 5,
    textAlign: 'center',
  },
});
