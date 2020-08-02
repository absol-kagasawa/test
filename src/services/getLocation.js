import Geolocation from '@react-native-community/geolocation';
import {setLocation} from '../utils/managerStorage';

export const getLocation = async () => {
  Geolocation.getCurrentPosition(
    async (position) => {
      const initialPosition = JSON.stringify(position);
      console.log('initialPosition', initialPosition, position);
      await setLocation(initialPosition);
    },
    (error) => {},
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
  );
};
