import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  left: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  right: {
    flex: 6,
    alignItems: 'flex-end',
  },
  btn: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    flex: 1,
  },
  footer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
});
