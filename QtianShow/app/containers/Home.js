import React, { Component } from 'react';
import{
  StyleSheet,
  Text,
  DrawerLayoutAndroid,
  TouchableHighlight,
  Dimensions,
  ScrollView,
  RefreshControl,
  BackAndroid,
  Platform,
  Image,
  View,
  InteractionManager
} from 'react-native';
import {connect} from 'react-redux';
import Drawer from 'react-native-drawer';
import ScrollableTabView  from 'react-native-scrollable-tab-view';
import LeftNav from './LeftNav';
import MineList from './MineList';
import H5See from './H5See';
import LifeShow from './LifeShow';

class Home extends Component{
  constructor(props){
    super(props);
  }
  _onMenuClick(){
    this.refs.drawer.open();
  }
  _githubClick(props){
    this.refs.drawer.close()
    if(props.navigator) {
        props.navigator.push({
            name: '我的github地址',
            component: H5See,
            params:{
              title:'我的github地址',
              url:'https://github.com/zhouzefei'
            }
        })
    }
  }
  _lifeClick(props){
    this.refs.drawer.close();
    if(props.navigator){
      props.navigator.push({
        name: '生活小趣',
        component: LifeShow,
        params:{
          title:'生活小趣',
          showPhoto:true
        }
      })
    }
  }
  _leftNav(){
    return <LeftNav {...this.props} pressHandle={()=>this._githubClick(this.props)} showLife={()=>this._lifeClick(this.props)}/>;
  }
  render(){
    const {navigator} = this.props;
    return (
      <Drawer
        ref="drawer"
        type="overlay"
        tapToClose={true}
        openDrawerOffset={0.2}
        tweenHandler={(ratio) => ({main: { opacity:(2-ratio)/2 }})}
        content={this._leftNav()}>
        <View style = {{flex: 1}}>
            <View style = {styles.headerBar}>
              <TouchableHighlight underlayColor="rgba(34, 26, 38, 0.1)" onPress={()=>this._onMenuClick()}>
                <Image style = {styles.iconImage} source = {require('../../images/personInfo.png')}></Image>
              </TouchableHighlight>
              <Text style = {styles.headerText}>有格调的逗比</Text>
            </View>
            <ScrollableTabView
            style = {{flex: 1,backgroundColor:'#fff'}}
            tabBarUnderlineColor = "#efefef"
            tabBarInactiveTextColor = "#F2F2F2"
            tabBarBackgroundColor = "#0cafa4"
            tabBarActiveTextColor = "white">
            <MineList category='show' {...this.props} tabLabel='我的作品'/>
            <MineList category='instrest' {...this.props} tabLabel='我的兴趣'/>
            </ScrollableTabView>
        </View>
      </Drawer>
    )
  }
}

const styles = StyleSheet.create({
  headerBar: {
    backgroundColor: '#0cafa4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 26,
    paddingBottom:10,
    paddingLeft:10,
  },
  iconImage:{
    width:28,
    height:28,
  },
  headerText:{
    color:'white',
    fontSize: 17,
    marginLeft:6,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});

function mapStateToProps(state) {
  const {home} = state;
  return {
    home
  }
}
export default connect(mapStateToProps)(Home);
