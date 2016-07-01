import React, { Component } from 'react';
import{
  StyleSheet,
  Text,
  View,
  WebView,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  ProgressBarAndroid,
  Linking,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
const width=Dimensions.get('window').width;
export default class H5See extends Component{
  constructor(props) {
      super(props);
      this.state = {
        isCanBack : false,
        progressValue: new Animated.Value(0)
      };
  }
  //模拟页面加载进度
  componentDidMount() {
      Animated.timing(this.state.progressValue, {
          toValue: width * 0.8,
          duration: 1500,
          easing: Easing.linear
      }).start();
  }
   //判断返回上一页的方式
  _onBackClick(navigator){
    if(this.state.isCanBack){
      this.refs.webview.goBack();
      return;
    }
    if(navigator) {
        navigator.pop();
      }
  }
  //回到上一页
  _onNavigationStateChange (navState){
    this.setState({
      isCanBack : navState.canGoBack
    });
  }
  //加载完成
  _onLoadEnd (){
    this.setState({
      progressValue : width
    })
  }
  render(){
    const {navigator,title,url}=this.props;
    return(
      <View style={{flex :1}}>
          <View style = {styles.headerBar}>
            <TouchableHighlight underlayColor="rgba(34, 26, 38, 0.1)" onPress={()=>this._onBackClick(navigator)}>
              <Image style = {styles.iconImage} source = {require('../../images/goback.png')}></Image>
            </TouchableHighlight>
            <Text style = {styles.headerText}>{title}</Text>
          </View>
          <Animated.View style = {{height: 2, backgroundColor: '#0cafa4', width: this.state.progressValue}}>
          </Animated.View>
          <WebView
            ref = 'webview'
            style = {{flex:1}}
            source = {{uri: url}}
            onNavigationStateChange  = {(navState) => this._onNavigationStateChange (navState)}
            onLoadEnd  = {() => this._onLoadEnd () }
            domStorageEnabled={true}
            automaticallyAdjustContentInsets={true}
            scalesPageToFit={true}
          />
     </View>
    )
  }
}
const styles = StyleSheet.create({
  iconImage: {
    height: 28,
    margin: 4,
    width: 28,
  },
  headerBar: {
    backgroundColor: '#0cafa4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 26,
    paddingBottom:10,
    paddingLeft:10,
  },
  headerText: {
    fontSize: 16,
    color: 'white',
    textAlign:'center',
    width:Dimensions.get('window').width*0.7,
    marginLeft:Dimensions.get('window').width*0.15-42,
  }
});
