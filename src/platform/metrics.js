import {Platform} from 'react-native';
import {isIphoneX} from '../utils/device';
const iOSStatusBarHeight = isIphoneX() === true ? 44 : 20;
const statusBarHeight = Platform.OS === 'ios' ? iOSStatusBarHeight : 22;
const navBarHeight =
  Platform.OS === 'ios' ? 50 + statusBarHeight : 30 + statusBarHeight;
export {statusBarHeight, navBarHeight};
