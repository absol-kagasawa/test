import {StyleSheet} from 'react-native';
import {colors} from '../../../../platform';
export default StyleSheet.create({
  top: {
    flex: 0,
    backgroundColor: colors.white,
  },
  children: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bottom: {
    flex: 1,
    backgroundColor: colors.bgTab,
  },
});
