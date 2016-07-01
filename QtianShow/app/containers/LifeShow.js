import React, { Component } from 'react';
import Qiniu from 'react-native-qiniu';
import ImagePicker from 'react-native-image-picker';
import Storage from '../util/Storage';
import ImageDetail from './ImageDetail';
import CryptoJS from 'crypto-js';
import{
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  Alert,
  Dimensions,
  InteractionManager,
  ScrollView
} from 'react-native';
Qiniu.Conf.ACCESS_KEY = '<your ACCESS_KEY>';
Qiniu.Conf.SECRET_KEY = '<your SECRET_KEY>';
const qnPath='http://o9iuh08yr.bkt.clouddn.com/';
const width=Dimensions.get('window').width;
let imgsArr=[];
export default class LifeShow extends Component{
  //获取列表页
  constructor(props){
    super(props);
    this.state={
      'imgs':[],
      'marker':'',
      'isNull':false
    };
    this._fetchJson=this._fetchJson.bind(this);
  }
  //读取图片地址
  componentDidMount(){
    const self=this;
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        'imgs':[]
      });
      var keyObj= CryptoJS.HmacSHA1("/list?bucket=qingtian-1991&limit=10\n", "<your SECRET_KEY>");
      var keyStr=keyObj.toString(CryptoJS.enc.Base64).replace(/\//g, '_').replace(/\+/g, '-');
      self._fetchJson('http://rsf.qbox.me/list?bucket=qingtian-1991&limit=10',keyStr);
    });
  }
  _fetchJson(url,authoriz){
    const self=this;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Host":'rsf.qbox.me',
        "Authorization":'QBox <ACCESS_KEY>:'+authoriz//Authorization＋ACCESS_KEY+':'+authoriz
      },
      body: ""
    }).then(response=>response.json())
      .then(responseData=>{
        imgsArr=imgsArr.concat(responseData.items);
        self.setState({
          imgs:imgsArr,
          marker:responseData.marker
        });
        if(responseData.items.length<1){
          self.setState({
            isNull:true
          })
        };
      }).catch((error) => {
          console.log('error');
      }).done();
  }
  _onImageClick(item,navigator){
    if(navigator){
      navigator.push({
        name:'ImageDetail',
        component : ImageDetail,
        params: {
          image:item
        }
      })
    }
  }
  _getImages(items,navigator){
    return(
      items.map((item,i)=>{
          if(item){
            return(
              <TouchableHighlight key = {i}  style={{padding:2}} onPress = {()=>this._onImageClick(item,navigator)}>
                <Image
                  style={{height:parseInt(0.4 * 20 + 12) * 10,width:(width-8)/2}}
                  source={{uri :'http://o9iuh08yr.bkt.clouddn.com/'+item.key}}
                />
              </TouchableHighlight>
            )
          }
      })
    )
  }
  //返回上一页
 _onBackClick(navigator){
   if(navigator) {
       navigator.pop();
     }
 }
 //上传图片
 _upImg(uri,imgName){
   const putPolicy = new Qiniu.Auth.PutPolicy2(
       {scope: "qingtian-1991:"+imgName}
   );
   const uptoken = putPolicy.token();
   const formInput={
     key:imgName,
   }
   const self=this;
   Qiniu.Rpc.uploadFile(uri,uptoken,formInput).then(function(response){
     return response.json();
   }).then(function(data){
      self.componentDidMount();
      alert('上传成功！');
   });
 }
 //选择图片
 _selectImg(){
   const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          const imgName = response.uri.substring(response.uri.lastIndexOf('/')+1);
          this._upImg(response.uri,imgName);
        }
      });
 }
 _getMoreImg(){
   if(!this.state.isNull){
     const marker=this.state.marker;
     var keyObj= CryptoJS.HmacSHA1("/list?bucket=qingtian-1991&limit=10&marker="+marker+"\n", "24bMm6wVG2XyKrrYHK7QYpZMQUXip4Q16CMZVXlW");
     var keyStr=keyObj.toString(CryptoJS.enc.Base64).replace(/\//g, '_').replace(/\+/g, '-');
     this._fetchJson('http://rsf.qbox.me/list?bucket=qingtian-1991&limit=10&marker='+marker,keyStr);
   }
 }
 render(){
    const {title,navigator}=this.props;
    return(
      <View style={{flex :1,backgroundColor:'#fff'}}>
          <View style = {styles.headerBar}>
            <TouchableHighlight underlayColor="rgba(34, 26, 38, 0.1)" onPress={()=>this._onBackClick(navigator)}>
              <Image style = {styles.iconImage} source = {require('../../images/goback.png')}/>
            </TouchableHighlight>
            <Text style = {styles.headerText}>{title}</Text>
            <TouchableHighlight underlayColor="rgba(34, 26, 38, 0.1)" onPress={()=>this._selectImg(navigator)}>
              <Image style={styles.iconImage} source={require('../../images/takePhoto.png')}/>
            </TouchableHighlight>
          </View>
          <ScrollView
            removeClippedSubviews={true}
            onScroll={(data) => { this._getMoreImg() }}
            style={{flex:1}}
          >
            <View style = {{flexDirection:'row',flexWrap:'wrap'}}>
                {this._getImages(this.state.imgs,navigator)}
            </View>
          </ScrollView>
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
