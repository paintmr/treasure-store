const initialState = {
  username: localStorage.getItem('username') || '',
  password: '',
  isFetching: false,
  status: localStorage.getItem('login') || false, //登录状态标识
}

export const types = {
  LOGIN_REQUEST: 'LOGIN/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN/LOGIN_SUCCESS',
  LOGIN_FAILUTE: 'LOGIN/LOGIN_FAILUTE',
  LOGOUT: 'LOGIN/LOGOUT',
  SET_USERNAME: 'LOGIN/SET_USERNAME',
  SET_PASSWORD: 'LOGIN/SET_PASSWORD',
}

export const actions = {
  setUsername: (username) => ({
    type: types.SET_USERNAME,
    username
  }),

  setPassword: (password) => ({
    type: types.SET_PASSWORD,
    password
  }),

  login: () => {
    //異步action，執行登錄
    return (dispatch, getState) => {
      const {username, password} = getState().login;
      if(!(/^\d{8}$/.test(username))){
        return dispatch(loginFailute('Please enter a HongKong mobile number (8 numbers)'))
      }
      if(!(username && username.length > 0 && password && password.length > 0)){
        return dispatch(loginFailute('Please enter the username and password.'))
      }
      dispatch(loginRequest());
      //模擬登錄操作。因為通過fetch調用PAI接口時，返回的是個promise對象，這裡可以手動創建一個promise對象。然後在promise內使用setTimeout，模擬異步操作。
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          dispatch(loginSuccess());
          localStorage.setItem('username', username);
          localStorage.setItem('login', true);//password是隱私，不適合保持在localStorage中
          resolve();
        }, 1000)
      })
    }
  },

  //真正的登出，是前後端都要去消除登錄狀態。
  logout: () => {
    localStorage.removeItem('username');
    localStorage.removeItem('login');
    return {
      type: types.LOGOUT
    };
  }
}

const loginFailute = error => ({
  type: types.LOGIN_FAILUTE,
  error
})

const loginRequest = () => ({
  type: types.LOGIN_REQUEST
})

const loginSuccess = () => ({
  type: types.LOGIN_SUCCESS
})

// reducer
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SET_USERNAME:
      return {...state, username: action.username};
    case types.SET_PASSWORD:
      return {...state, password: action.password};
    case types.LOGIN_REQUEST:
      return {...state, isFetching: true};
    case types.LOGIN_SUCCESS:
      return {...state, isFetching: false, status: true};
    case types.LOGIN_FAILUTE://具體的錯誤信息放在app的error狀態下，所以login模塊就不單獨維護錯誤信息了。
      return {...state, isFetching: false};
    case types.LOGOUT:
      return {...state, status: false, username: '', password: ''}
    default:
      return state;
  }
}

export default reducer;

//selectors
export const getUsername = state => state.login.username;

export const getPassword = state => state.login.password;

export const isLogin = state => state.login.status;