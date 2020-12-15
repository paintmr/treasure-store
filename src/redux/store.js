import { createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import api from "./middleware/api";
import rootReducer from "./modules";

let store;

if (
  process.env.NODE_ENV !== "production" &&
  window.__REDUX_DEVTOOLS_EXTENSION__
) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__;
  store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk, api) //把api放在thunk之后，因为需要redux-thunk处理函数类型的action
  ));
} else {
  store = createStore(rootReducer, applyMiddleware(thunk, api));
}



export default store;