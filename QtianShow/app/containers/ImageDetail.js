import React, { Component } from 'react';
import {
    View,
    Dimensions,
    TouchableHighlight,
    LayoutAnimation,
    Animated,
    Easing,
    TouchableWithoutFeedback,
    Image,
    StyleSheet,
    Text
} from 'react-native';
export default class ImageDetail extends Component {
  constructor(props) {
    super(props);
    this.image = props.image;
    this.state = {
      h : new Animated.Value(0.5),
      w : new Animated.Value(0.5)
    };
  }
  componentWillMount() {
   LayoutAnimation.spring();
  }
  componentDidMount(){
    Animated.timing(this.state.h, {
        toValue: height * 1,
        duration: 200,
        easing: Easing.linear
    }).start();
    Animated.timing(this.state.w, {
        toValue: width * 1,
        duration: 200,
        easing: Easing.linear
    }).start();

  }
  _onBackClick(){
    const {navigator} = this.props;
    if(navigator) {
      navigator.pop();
    }
  }
  render() {
    return(
      <View style={{flex :1,backgroundColor:'#fff'}}>
        <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
          <TouchableWithoutFeedback onPress={()=>this._onBackClick()}>
            <Animated.Image style = {{height:this.state.h, width:this.state.w}} source = {{uri:'http://o9iuh08yr.bkt.clouddn.com/'+this.image.key}}></Animated.Image>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}
let {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  iconImage: {
    height: 30,
    margin: 4,
    width: 30
  },
  headerBar: {
    backgroundColor: '#27B5EE',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    padding: 10
  },
  headerText: {
    fontSize: 22,
    color: 'white',
    marginLeft: 10
  }
});
