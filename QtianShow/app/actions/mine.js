import * as types from '../constants/ActionTypes';

export function fetchMine(category = 'show', index =1, isLoadMore, nowRead){
  return dispatch=>{
    if(!isLoadMore){
			dispatch(fetchMineList(category));
		}
    let URL =`http://172.21.0.219:3000/${category}`;
    fetch(URL).then(response=>response.json())
      .then(responseData=>{
        if(!isLoadMore){
          dispatch(receiveMineList(responseData,category));
        }else{
          dispatch(receiveMineListMore(responseData,category,nowRead));
        }
      }).catch((error) => {
			 		console.log('error');
			}).done();
  }
}
function fetchMineList(category) {
	return {
		type: types.FETCH_MINE_LIST,
		category: category,
		isRefreshing: true
	}
}

function receiveMineList(mineList,category) {
	return {
		type: types.RECEIVE_MINE_LIST,
		isRefreshing: false,
		category: category,
		mineList: mineList
	}
}

function receiveMineListMore(mineList, category, nowRead) {
	return {
		type: types.RECEIVE_MINE_LIST_MORE,
		isRefreshing: false,
		category: category,
		nowRead : nowRead,
		mineList: mineList
	}
}
