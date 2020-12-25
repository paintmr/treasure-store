import { combineReducers } from "redux";
import products from "./products";
import shops from  "./shops";
import keywords from './keywords';
import orders from "./orders";
import comments from "./comments";

//合并领域状态
const rootReducer = combineReducers({
  products,
  shops,
  keywords,
  orders,
  comments
})

export default rootReducer