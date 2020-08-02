import {
  ON_SCROLL_TOP,
  ON_RELOAD_SUB_SCREEN,
  ON_RELOAD_SUB_SCREEN_DONE,
} from '../actions/activeType';

const defaultState = {
  onScroll: false,
  onReload: false,
  screen: '',
  typeOnLoad: '',
  keyScreen: '',
};

const controllerReducer = (state = defaultState, action) => {
  const {payload} = action;
  switch (action.type) {
    case ON_SCROLL_TOP:
      return {
        ...state,
        screen: payload,
        onScroll: true,
      };
    case ON_RELOAD_SUB_SCREEN:
      return {
        ...state,
        keyScreen: payload.key,
        typeOnLoad: payload.typeReload,
        onReload: true,
      };
    case ON_RELOAD_SUB_SCREEN_DONE:
      return {
        ...state,
        typeOnLoad: '',
      };
    default:
      return state;
  }
};
export default controllerReducer;
