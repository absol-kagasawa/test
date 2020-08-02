import fetcher from './fetcher';
import {BASE_URL_API} from '../configs/urlApi';
import {setToken} from '../utils/managerStorage';
const URL = BASE_URL_API + 'getAppToken.php';
export const getAppToken = async () => {
  try {
    const result = await fetcher({
      method: 'POST',
      baseURL: URL,
      headers: {},
    });
    if (result && result.status === 200 && result.data) {
      console.log('status', result);
      if (result && result.data && result.data.status === 'success') {
        const {data = {}} = result;
        const {token = ''} = data;
        await setToken(token);
        return token;
      }
      return null;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
