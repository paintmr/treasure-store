import { combineReducers } from "redux";
import app from "./app";
import entities from "./entities";
import home from "./home";
import detail from "./detail";
import search from './search';


//合并成根reducer
const rootReducer = combineReducers({
  app,
  entities,
  home,
  detail,
  search  
})

export default rootReducer;