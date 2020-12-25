import url from '../../utils/url';
import { FETCH_DATA } from '../middleware/api';
import { schema as keywordSchema} from './entities/keywords';


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
  relatedKeywords:{

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
  loadPopularKeywords: () => {
    return (dispatch, getState) => {
      const {ids} = getState().search.popularKeywords;
      if(ids.length > 0) {
        return null;
      }
      const endpoint = url.getPopularKeywords();
      return dispatch(fetchPopularKeywords(endpoint));
    }
  },
  loadRelatedKeywords: (text) => {
    return (dispatch, getState) => {
      const { relatedKeywords } = getState.search;
      if(relatedKeywords[text]){
        return null
      }
      const endpoint = url.getRelatedKeywords(text)
      return dispatch(fetchRelatedKeywords(text, endpoint))
    }
  },
  setInputText: text => ({
    type: types.SET_INPUT_TEXT,
    text
  }),
  clearInputText: () => {
    type: types.CLEAR_INPUT_TEXT
  },
  addHistoryword: keywordId => ({
    type: types.ADD_HISTORY_KEYWORD,
    text: keywordId
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