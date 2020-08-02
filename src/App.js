import React from 'react';
import Navigator from './navigator';
import {Provider} from 'react-redux';
import rootStore from './store';
const store = rootStore();
const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};
export default App;
