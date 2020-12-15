const initialState = {
  error: null
}

export const types = {
  CLEAR_ERROR: "APP/CLEAR_ERROR"
}

//action creators
export const actions = {
  clearError: () => ({
    type: types.CLEAR_ERROR
  })
}

const reducer = (state = initialState, action) => {
  const { type, error } = action
  if (type === types.CLEAR_ERROR) {
    return {...state, error: null}   //对state进行相应的修改，既可以根据action中type的类别 
  } else if (error) {
    return {...state, error: error} //对state进行相应的修改，也可以根据action中特有的属性
  }
  return state;
}

export default reducer;

// selectors
export const getError = (state) => {
  return state.app.error
}