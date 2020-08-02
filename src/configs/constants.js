import {icons} from '../platform';
const TAB_NAME = {
  home: 'home',
  schedule: 'schedule',
  location: 'location',
  video: 'video',
  mypage: 'mypage',
};
const TAB_BAR = [
  {
    id: 1,
    name: TAB_NAME.home,
    label: 'ホーム',
    icon: icons.icHome,
  },
  {
    id: 2,
    name: TAB_NAME.schedule,
    label: 'スケジュール',
    icon: icons.icSchedule,
  },
  {
    id: 3,
    name: TAB_NAME.location,
    label: 'ホール検索',
    icon: icons.icLocation,
  },
  {
    id: 4,
    name: TAB_NAME.video,
    label: '動画',
    icon: icons.icVideo,
  },
  {
    id: 5,
    name: TAB_NAME.mypage,
    label: 'マイページ',
    icon: icons.icMyPage,
  },
];
const TOKEN = '@access_token';
const WEB_TASK_LIST = '@web_task_list';
const LOCATION = '@location';

export {TAB_BAR, TOKEN, WEB_TASK_LIST, LOCATION, TAB_NAME};
