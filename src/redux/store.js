import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import api from "./middleware/api"
import rootReducer from "./modules"

let store;

if (
  process.env.NODE_ENV !== "production" && window.__REDUX_DEVTOOLS_EXTENSION__ //如果处于开发状态（developer），且浏览器已安装了redux-devtools-extension
) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; //redux-devtools-extension的增强器
  store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, api)));
  //redux-devtools-extension增强器把中间件包含进去，方便调试，相关讲解内容在视频4-12，5-6，7-5
  //注意，把API这个中间件放到thunk这个中间件之后，因为需要thunk来处理函数类型的action，然后再经过API这个中间件执行具体的请求的封装。
} else {
  store = createStore(rootReducer, applyMiddleware(thunk, api));
}

export default store;