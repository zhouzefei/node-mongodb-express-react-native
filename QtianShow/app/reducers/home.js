import * as types from '../constants/ActionTypes';

const initialState=[{
	isRefreshing: false,
	isFirstLoaded: true,
	isLoadMore: false,
	noMore: false,
	index: 1,
	mineList: []
},{
	isRefreshing: false,
	isFirstLoaded: true,
	isLoadMore: false,
	noMore: false,
	index: 1,
	mineList: []
}];

export default function home(state=initialState,action){
  switch (action.type) {
    case types.FETCH_MINE_LIST:
			switch (action.category) {
				case 'show':
		      state[0].isRefreshing = action.isRefreshing;
					break;
				case 'instrest':
					state[1].isRefreshing = action.isRefreshing;
					break;
		  }
			return Object.assign({}, state);
    case types.RECEIVE_MINE_LIST:
			switch (action.category) {
				case 'show':
					state[0].isRefreshing = action.isRefreshing;
					state[0].mineList = action.mineList;
					state[0].isFirstLoaded = false;
					break;
				case 'instrest':
					state[1].isRefreshing = action.isRefreshing;
					state[1].mineList = action.mineList;
					state[1].isFirstLoaded = false;
					break;
			}
      return Object.assign({}, state);
    case types.RECEIVE_MINE_LIST_MORE:
			switch (action.category) {
				case 'show':
					state[0].isRefreshing = action.isRefreshing;
					state[0].mineList = state[0].mineList;
					state[0].index = state[0].index + 1;
					break;
				case 'instrest':
					state[1].isRefreshing = action.isRefreshing;
					state[1].mineList = state[1].mineList;
					state[1].index = state[1].index + 1;
					break;
			}
      return Object.assign({}, state);
    default:
			return state;
  }
}
