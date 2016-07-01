/**
 * qingtian personalShow
 * 2016-06-23
 */
import React, { Component } from 'react';
import {Provider} from 'react-redux';
import configureStore from './app/store/configure-store';

import App from './app/containers/App';

import {
  AppRegistry,
} from 'react-native';

const store = configureStore();

class QtianShow extends Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('QtianShow', () => QtianShow);
