import { combineReducers } from 'redux';
import url from "../../utils/url";
import { FETCH_DATA } from "../middleware/api";
import { schema } from "./entities/products";

//请求参数使用到的常量对象
export const params = {
  PATH_LIKES: 'likes',
  PATH_DISCOUNTS: 'discounts',
  PAGE_SIZE_LIKES: 7,
  PAGE_SIZE_DISCOUNTS: 3,
}

export const types = {
  //获取discounts请求
  FETCH_DISCOUNTS_REQUEST: "HOME/FETCH_DISCOUNTS_REQUEST",
  //获取discounts请求成功
  FETCH_DISCOUNTS_SUCCESS: "HOME/FETCH_DISCOUNTS_SUCCESS",
  //获取discounts请求失败
  FETCH_DISCOUNTS_FAILURE: "HOME/FETCH_DISCOUNTS_FAILURE",
  //获取recommendations请求
  FETCH_LIKES_REQUEST: "HOME/FETCH_LIKES_REQUEST",
  //获取recommendations请求成功
  FETCH_LIKES_SUCCESS: "HOME/FETCH_LIKES_SUCCESS",
  //获取recommendations请求失败
  FETCH_LIKES_FAILURE: "HOME/FETCH_LIKES_FAILURE",
}

const initialState = {
  discounts: {
    isFetching: false,
    ids: []
  },
  likes: {
    isFetching: false,
    pageCount: 0,
    ids: []
  }
}

export const actions = {
  loadDiscounts: () => {//這裡已經是dispatch的action了（假設為actionA）
    return (dispatch, getState) => {//接下來又往actionA中傳入dispatch和getState，是為了讓actionA來dispatch調用新的action（假設為actionB）
      const { ids } = getState().home.discounts;//redux缓存层：已经从mock数据中请求了数据过来放在了redux中，就没必要重新去mock数据中请求了
      if (ids.length > 0) {
        return null;
      }
      const endpoint = url.getProductList(params.PATH_DISCOUNTS, 0, params.PAGE_SIZE_DISCOUNTS);
      return dispatch(fetchDiscounts(endpoint))  //（actionB是fetchDiscounts）
    }
  },
  loadLikes: () => {
    return (dispatch, getState) => {
      const { pageCount } = getState().home.likes;
      const rowIndex = pageCount * params.PAGE_SIZE_LIKES;
      const endpoint = url.getProductList(params.PATH_LIKES, rowIndex, params.PAGE_SIZE_LIKES)
      return dispatch(fetchLikes(endpoint))
    }
  }

}

const fetchDiscounts = endpoint => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_DISCOUNTS_REQUEST,
      types.FETCH_DISCOUNTS_SUCCESS,
      types.FETCH_DISCOUNTS_FAILURE
    ],
    endpoint,
    schema
  }
})

const fetchLikes = endpoint => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_LIKES_REQUEST,
      types.FETCH_LIKES_SUCCESS,
      types.FETCH_LIKES_FAILURE
    ],
    endpoint,
    schema
  }
})

const discounts = (state = initialState.discounts, action) => {
  switch (action.type) {
    case types.FETCH_DISCOUNTS_REQUEST:
      return { ...state, isFetching: true };
    case types.FETCH_DISCOUNTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: state.ids.concat(action.response.ids)
      };
    case types.FETCH_DISCOUNTS_FAILURE:
      return {
        ...state,
        isFetching: false
        //无需做错误处理，因为已经做了通用的错误处理
      }
    default:
      return state;
  }
}

const likes = (state = initialState.likes, action) => {
  switch (action.type) {
    case types.FETCH_LIKES_REQUEST:
      return { ...state, isFetching: true };
    case types.FETCH_LIKES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        pageCount: state.pageCount + 1,
        ids: state.ids.concat(action.response.ids)
      };
    case types.FETCH_LIKES_FAILURE:
      return {
        ...state,
        isFetching: false
        //无需做错误处理，因为已经做了通用的错误处理
      }
    default:
      return state;
  }
}

const reducer = combineReducers({
  discounts,
  likes
})

export default reducer;

//selectors
export const getDiscounts = state => {
  return state.home.discounts.ids.map(id => {
    return state.entities.products[id]
  })
}

export const getLikes = state => {
  return state.home.likes.ids.map(id => {
    return state.entities.products[id]
  })
}

export const getPageCountOfLikes = state => {
  return state.home.likes.pageCount
}