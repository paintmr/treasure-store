import { combineReducers } from "redux";
import app from "./app";
import entities from "./entities";
import home from "./home";
import detail from "./detail";
import search from './search';
import login from './login';


//合并成根reducer
const rootReducer = combineReducers({
  app,
  entities,
  home,
  detail,
  search,
  login  
})

export default rootReducer;