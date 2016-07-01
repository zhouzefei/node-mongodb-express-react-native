import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
} from 'react-native';

import Home from './Home';
export default class App extends Component{
  constructor(props){
    super(props);
  }
  render(){
    const [name,home]=['Home',Home];
    return (
      <Navigator
       initialRoute={{ name: name, component: home }}
       configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromRight}
       renderScene={(route, navigator) => {
         let Component = route.component;
         return <Component {...route.params} navigator={navigator} />
       }} />
    );
  }
}
