import {
  ON_SCROLL_TOP,
  ON_RELOAD_SUB_SCREEN,
  ON_RELOAD_SUB_SCREEN_DONE,
} from './activeType';

export function onScrollTop(value) {
  return {
    type: ON_SCROLL_TOP,
    payload: value,
  };
}

export function onReloadScreenSub(value) {
  return {
    type: ON_RELOAD_SUB_SCREEN,
    payload: value,
  };
}
export function onReloadScreenSubDone(value) {
  return {
    type: ON_RELOAD_SUB_SCREEN_DONE,
    payload: value,
  };
}
