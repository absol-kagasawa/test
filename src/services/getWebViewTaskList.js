import fetcher from './fetcher';
import {setWebTaskList} from '../utils/managerStorage';

const URL = 'https://www.dechau.com/api/getWebViewsList.php';

export const getWebTasKList = async (access_token) => {
  try {
    if (access_token) {
      const urlSt = URL + '?app_token=' + access_token;
      const result = await fetcher({
        method: 'GET',
        baseURL: urlSt,
        headers: {},
      });
      if (result && result.status === 200 && result.data) {
        if (result && result.data && result.data.status === 'success') {
          const {data = {}} = result;
          const {urls = []} = data;
          await setWebTaskList(urls);
          return urls;
        }
        return null;
      }
      return null;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
