import React, { Component } from 'react';
import{
  StyleSheet,
  Text,
  Dimensions,
  RefreshControl,
  Image,
  View,
  ListView,
  InteractionManager,
  TouchableHighlight
} from 'react-native';
import {fetchMine} from '../actions/mine';
import H5See from './H5See';
class MineList extends Component{
  constructor(props){
      super(props);
      this.state={}
      this.dataSource = new ListView.DataSource({
        rowHasChanged:(row1,row2)=>row1 !== row2
      })
  }
  componentWillMount(){
    const {dispatch,category}=this.props;
    InteractionManager.runAfterInteractions(() => {
      dispatch(fetchMine(category));
    });
  }
  _onRefresh() {
    this.componentWillMount();
  }

  _pushWebView(title,url){
    const {navigator}=this.props;
    if(navigator) {
        navigator.push({
            name: title,
            component: H5See,
            params:{
              title:title,
              url:url
            }
        })
    }
  }
  _renderRow(data){
    return(
      <TouchableHighlight underlayColor="rgba(34, 26, 38, 0.1)" onPress={this._pushWebView.bind(this,data.title,data.url)}>
        <View style={styles.cell}>
          <View style={[styles.sameCell,styles.marBtm10]}>
            <Text numberOfLines={1} style={{width:200}}>{data.title}</Text>
            <Image
              style={styles.imgSize}
              source={require('../../images/preview.png')}
            />
          </View>
            <Text style={styles.greyTxt}>{data.summary}</Text>
            <View style={styles.sameCell}>
              <Text style={styles.greyTxt}>{this._formatDate(data.meta.updateAt)}</Text>
              <Text style={styles.greyTxt}>作者：{data.author}</Text>
            </View>
        </View>
      </TouchableHighlight>
    );
  }
  _renderFooter(isFirstLoaded){

  }
  _formatDate (strTime) {
    var date = new Date(strTime);
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
  }
  render(){
    const {category,dispatch,home} = this.props;
    let homeData;
    switch(category){
      case 'show':homeData=home[0]; break;
      case 'instrest':homeData=home[1]; break;
      default:homeData=home[0]; break;
    }
    const isFirstLoaded=homeData.mineList.length!=0;
    return (
      <ListView
        enableEmptySections={true}
        style={{flex: 1}}
        dataSource={this.dataSource.cloneWithRows(homeData.mineList)}
        renderRow={this._renderRow.bind(this)}
        initialListSize={10}
        onEndReachedThreshold={10}
        pageSize={homeData.mineList.length}
        refreshControl={
            <RefreshControl
              refreshing={homeData.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              colors={['#ff0000', '#00ff00', '#0000ff','#3ad564']}
              progressBackgroundColor="#ffffff"/>}
      />
    )
  }
}
const styles = StyleSheet.create({
  'ListViewWrap':{
    flex:1
  },
  cell:{
    borderBottomWidth:StyleSheet.hairlineWidth,
    borderColor:'#c9c9c9',
    padding:12
  },
  greyTxt:{
    color:'#999'
  },
  sameCell:{
    flex:1,
    justifyContent:'space-between',
    flexDirection:'row',
    flexWrap:'nowrap',
    marginTop:10,
  },
  imgSize:{
    width:20,
    height:20
  },
  marBtm10:{
    marginBottom:10
  }
})
export {MineList as default};
