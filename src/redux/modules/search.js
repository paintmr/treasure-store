const initialState = {
  inputText: '',
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
  pupolarSearchKeywords: {
    isFetching: false,
    ids: []
  },
  historyKeywords: []
}