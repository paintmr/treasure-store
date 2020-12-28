import url from '../../utils/url';
import { FETCH_DATA } from '../middleware/api';
import { schema as keywordSchema, getKeywordById } from './entities/keywords';
import { schema as shopSchema, getShopById } from './entities/shops';
import { combineReducers } from 'redux';

const initialState = {
  inputText: '',
  popularKeywords: {
    isFetching: false,
    ids: []
  },
  /**relatedKeywords对象结构
   * {
   *  'hotpot': {
   *      isFetching: false,
   *      ids: []   
   *   }
   * }
   * 
  */
  relatedKeywords: {},
  historyKeywords: [],
  /**
  *searchedShops对象结构：
  *{
  *  'keywordId': {
  *     isFetching: false,
  *     ids: []
  *   }
  *}
  */
 searchedShops: {},
}

export const types = {
  FETCH_POPULAR_KEYWORDS_REQUEST:
    'SEARCH/FETCH_POPULAR_KEYWORDS_REQUEST',
  FETCH_POPULAR_KEYWORDS_SUCCESS:
    'SEARCH/FETCH_POPULAR_KEYWORDS_SUCCESS',
  FETCH_POPULAR_KEYWORDS_FAILURE:
    'SEARCH/FETCH_POPULAR_KEYWORDS_FAILURE',

  SET_INPUT_TEXT:
    'SEARCH/SET_INPUT_TEXT',
  CLEAR_INPUT_TEXT:
    'SEARCH/CLEAR_INPUT_TEXT',

  FETCH_RELATED_KEYWORDS_REQUEST:
    'SEARCH/FETCH_RELATED_KEYWORDS_REQUEST',
  FETCH_RELATED_KEYWORDS_SUCCESS:
    'SEARCH/FETCH_RELATED_KEYWORDS_SUCCESS',
  FETCH_RELATED_KEYWORDS_FAILURE:
    'SEARCH/FETCH_RELATED_KEYWORDS_FAILURE',

  ADD_HISTORY_KEYWORD:
    'SEARCH/ADD_HISTORY_KEYWORD',
  CLEAR_HISTORY_KEYWORDS:
    'SEARCH/CLEAR_HISTORY_KEYWORDS',

  FETCH_RELATED_SHOPS_REQUEST:
    'SEARCH/FETCH_RELATED_SHOPS_REQUEST',
  FETCH_RELATED_SHOPS_SUCCESS:
    'SEARCH/FETCH_RELATED_SHOPS_SUCCESS',
  FETCH_RELATED_SHOPS_FAILURE:
    'SEARCH/FETCH_RELATED_SHOPS_FAILURE',
}

export const actions = {
  loadPopularKeywords: () => {//這裡已經是dispatch的action了（假設為actionA）
    return (dispatch, getState) => {//接下來又往actionA中傳入dispatch和getState，是為了讓actionA來dispatch調用新的action（假設為actionB）
      const { ids } = getState().search.popularKeywords;
      if (ids.length > 0) {
        return null;
      }
      const endpoint = url.getPopularKeywords();
      return dispatch(fetchPopularKeywords(endpoint)); //（actionB是fetchPopularKeywords）
    }
  },
  setInputText: text => ({
    type: types.SET_INPUT_TEXT,
    text
  }),
  loadRelatedKeywords: (text) => {
    return (dispatch, getState) => {
      const { relatedKeywords } = getState().search;
      if (relatedKeywords[text]) {
        return null
      }
      const endpoint = url.getRelatedKeywords(text)
      return dispatch(fetchRelatedKeywords(text, endpoint))
    }
  },
  clearInputText: () => ({
    type: types.CLEAR_INPUT_TEXT
  }),
  addHistoryKeyword: keywordId => ({
    type: types.ADD_HISTORY_KEYWORD,
    keywordId: keywordId
  }),
  clearHistoryKeywords: () => ({
    type: types.CLEAR_HISTORY_KEYWORDS
  }),
  loadRelatedShops: (keywordId) => {
    return (dispatch, getState) => {
      const {searchedShops} = getState().search;
      if(searchedShops[keywordId]) {
        return null
      }     
      const endpoint = url.getRelatedShops(keywordId);
      return dispatch(fetchRelatedShops(keywordId, endpoint));
    }
  }
}

const fetchPopularKeywords = endpoint => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_POPULAR_KEYWORDS_REQUEST,
      types.FETCH_POPULAR_KEYWORDS_SUCCESS,
      types.FETCH_POPULAR_KEYWORDS_FAILURE,
    ],
    endpoint,
    schema: keywordSchema
  },
})

const fetchRelatedKeywords = (text, endpoint) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_RELATED_KEYWORDS_REQUEST,
      types.FETCH_RELATED_KEYWORDS_SUCCESS,
      types.FETCH_RELATED_KEYWORDS_FAILURE,
    ],
    endpoint,
    schema: keywordSchema
  },
  text
})

const fetchRelatedShops = (keywordId, endpoint) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_RELATED_SHOPS_REQUEST,
      types.FETCH_RELATED_SHOPS_SUCCESS,
      types.FETCH_RELATED_SHOPS_FAILURE,
    ],
    endpoint,
    schema:shopSchema
  },
  keywordId
})

//reducers
const popularKeywords = (state = initialState.popularKeywords, action) => {
  switch (action.type) {
    case types.FETCH_POPULAR_KEYWORDS_REQUEST:
      return { ...state, isFetching: true };
    case types.FETCH_POPULAR_KEYWORDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: state.ids.concat(action.response.ids)
      };
    case types.FETCH_POPULAR_KEYWORDS_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
}

const inputText = (state = initialState.inputText, action) => {
  switch(action.type) {
    case types.SET_INPUT_TEXT:
      return action.text;
    case types.CLEAR_INPUT_TEXT:
      return '';
    default:
      return state
  }
}

const relatedKeywords = (state = initialState.relatedKeywords, action) => {
  switch (action.type) {
    case types.FETCH_RELATED_KEYWORDS_REQUEST:
    case types.FETCH_RELATED_KEYWORDS_SUCCESS:
    case types.FETCH_RELATED_KEYWORDS_FAILURE:
      return {
        ...state,
        [action.text]: relatedKeywordsByText(state[action.text], action)
      }
    default:
      return state;
  }
}

//这是比relatedKeywords更低层的一个reducer，其处理逻辑和popularKeywords一样。
//state层级越深，reducer处理起来就越麻烦。所以尽量保持state扁平化。
const relatedKeywordsByText = (state = { isFetching: false, ids: [] }, action) => {
  switch (action.type) {
    case types.FETCH_POPULAR_KEYWORDS_REQUEST:
      return { ...state, isFetching: true }
    case types.FETCH_RELATED_KEYWORDS_SUCCESS:
      return { ...state, isFetching: false, ids: state.ids.concat(action.response.ids) }
    case types.FETCH_RELATED_KEYWORDS_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
}

const historyKeywords = (state = initialState.historyKeywords, action) => {
  switch(action.type) {
    case types.ADD_HISTORY_KEYWORD:
     const data = state.filter(item => {
        if(item !== action.keywordId) {
          return true;
        }
        return false;
      })
      return [action.keywordId, ...data];
    case types.CLEAR_HISTORY_KEYWORDS:
      return [];
    default:
      return state;
  }
}

const searchedShops = (state = initialState.searchedShops, action) => {
  switch(action.type) {
    case types.FETCH_RELATED_SHOPS_REQUEST:
    case types.FETCH_RELATED_SHOPS_SUCCESS:      
    case types.FETCH_RELATED_SHOPS_FAILURE:
      return {
        ...state,
        [action.keywordId]: searchedShopsByKeyword(state[action.keywordId], action)
      };
    default:
      return state;
  }
}

const searchedShopsByKeyword = (state = {isFetching: false, ids: []}, action) => {
  switch(action.type) {
    case types.FETCH_RELATED_SHOPS_REQUEST:
      return {...state, isFetching: true};
    case types.FETCH_RELATED_SHOPS_SUCCESS:      
      return {...state, isFetching: false, ids: state.ids.concat(action.response.ids)};
    case types.FETCH_RELATED_SHOPS_FAILURE:
      return {...state, isFetching: false};
    default:
      return state;
  }
}

const reducer = combineReducers({
  popularKeywords,
  relatedKeywords,
  inputText,
  historyKeywords,
  searchedShops
})

export default reducer;

//selectors for Search Page
//不同的redux模块之间，也是通过selectors通讯
export const getPopularKeywords = state => {
  return state.search.popularKeywords.ids.map(id => {
    return getKeywordById(state, id)
  })
}

export const getRelatedKeywords = state => {
  const text = state.search.inputText;
  if(!text || text.trim().length === 0) {
    return [];
  }
  const relatedKeywords = state.search.relatedKeywords[text];
  if(!relatedKeywords) {
    return [];
  }
  return relatedKeywords.ids.map(id => {
    return getKeywordById(state, id);
  })
}

export const getInputText = state => {
  return state.search.inputText
}

export const getHistoryKeywords = state => {
  return state.search.historyKeywords.map(id => {
    return getKeywordById(state,id)
  })
}

//selectors for SearchResult page
export const getCurrentKeyword = state => {
  const keywordId = state.search.historyKeywords[0];
  if(!keywordId) {
    return '';
  }
  return getKeywordById(state, keywordId).keyword;
}

export const getSearchedShops = state => {
  const keywordId = state.search.historyKeywords[0];
  if(!keywordId) {
    return [];
  }
  const shops = state.search.searchedShops[keywordId];
  return shops.ids.map( id => {
    return getShopById(state,id);
  })

}