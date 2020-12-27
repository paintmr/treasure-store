import url from '../../utils/url';
import { FETCH_DATA } from '../middleware/api';
import { schema as keywordSchema, getKeywordById } from './entities/keywords';
import { combineReducers } from 'redux';

const initialState = {
  inputText: '',
  popularKeywords: {
    isFetching: false,
    ids: []
  },
  /**relatedKeywords对象结构
   * {
   *  '火锅': {
   *      isFetching: false,
   *      ids: []   
   *   }
   * }
   * 
  */
  relatedKeywords: {

  },
  historyKeywords: []
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
    'SEARCH/CLEAR_HISTORY_KEYWORDS'
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
  })
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

const reducer = combineReducers({
  popularKeywords,
  relatedKeywords,
  inputText,
  historyKeywords
})

export default reducer;

//selectors
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