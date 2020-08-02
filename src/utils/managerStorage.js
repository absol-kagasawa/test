import AsyncStorage from '@react-native-community/async-storage';
import {TOKEN, WEB_TASK_LIST, LOCATION} from '../configs/constants';

export const setToken = async (value) => {
  try {
    await AsyncStorage.setItem(TOKEN, value);
  } catch (error) {
    console.log(error);
  }
};

export const getToken = async () => {
  try {
    const access_token = await AsyncStorage.getItem(TOKEN);
    if (access_token) {
      return access_token;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

export const setWebTaskList = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(WEB_TASK_LIST, jsonValue);
  } catch (error) {
    console.log(error);
  }
};

export const getWebTaskList = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(WEB_TASK_LIST);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const setLocation = async (value) => {
  try {
    await AsyncStorage.setItem(LOCATION, value);
  } catch (error) {
    console.log(error);
  }
};

export const getLocation = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(LOCATION);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
