import React, { Component } from 'react';
import{
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight
} from 'react-native';
export default class LeftNav extends Component{
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.headTop}>
          <View style={styles.headImg}>
            <View style={styles.innerHeadImg}>
              <Image style={styles.MyHeader} source = {require('../../images/mine.jpg')}/>
            </View>
          </View>
          <Text style={styles.title}>晴天-QingTian</Text>
        </View>
        <View style={styles.describeWrap}>
          <Image style={styles.smallImg} source = {require('../../images/phone.png')}/>
          <Text style={styles.describe}>15957102436</Text>
        </View>
        <View style={styles.describeWrap}>
          <Image style={styles.smallImg} source = {require('../../images/place.png')}/>
          <Text style={styles.describe}>浙江省杭州市余杭区</Text>
        </View>
        <TouchableHighlight onPress={this.props.pressHandle}>
          <View style={styles.describeWrap}>
            <Image style={styles.smallImg} source = {require('../../images/github.png')}/>
            <Text style={styles.describe}>https://github.com/zhouzefei</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.showLife}>
          <View style={styles.describeWrap}>
            <Image style={styles.smallImg} source = {require('../../images/photo.png')}/>
            <Text style={styles.describe}>生活那些事</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#182322'
  },
  headTop:{
    backgroundColor:'#0c1d1b',
    height:190,
    marginBottom:20
  },
  headImg:{
    width:90,
    height:90,
    overflow:'hidden',
    borderColor:'#09827a',
    borderWidth:3,
    borderRadius:90,
    alignSelf:'center',
    marginTop:40,
    backgroundColor:'#000',
  },
  title:{
    color:'#fff',
    fontWeight:'bold',
    textAlign:'center',
    marginTop:10
  },
  innerHeadImg:{
    width:80,
    height:80,
    overflow:'hidden',
    borderRadius:80,
    marginTop:2,
    marginLeft:2
  },
  MyHeader:{
    width:80,
    height:80,
  },
  describeWrap:{
    height:50,
    borderBottomWidth:1,
    borderColor:'#0c1d1b',
    paddingLeft:15,
    flexDirection:'row',
    alignItems:'center'
  },
  smallImg:{
    width:26,
    height:26,
  },
  describe:{
    color:'#fff',
    marginLeft:10
  },
});
