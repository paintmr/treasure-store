import { combineReducers } from "redux";
import app from "./app";
import entities from "./entities";
import home from "./home";
import detail from "./detail";
import search from './search';
import login from './login';
import user from './user';
import purchase from './purchase';


//合并成根reducer
const rootReducer = combineReducers({
  app,
  entities,
  home,
  detail,
  search,
  login,
  user,
  purchase  
})

export default rootReducer;