import { combineReducers } from 'redux';
import url from '../../utils/url';
import {FETCH_DATA} from '../middleware/api';
import {schema, PAID_TYPE, TO_BE_PAID_TYPE, REFUND_TYPE} from './entities/orders';

const initialState = {
  orders: {
    isFetching: false,
    ids: [],
    toBePaidIds: [],
    paidIds: [],
    refundIds: []
  },
  currentTab: 0,
}

export const types = {
  FETCH_ORDERS_REQUEST: 'USER/FETCH_ORDERS_REQUEST',
  FETCH_ORDERS_SUCCESS: 'USER/FETCH_ORDERS_SUCCESS',
  FETCH_ORDERS_FAILURE: 'USER/FETCH_ORDERS_FAILURE',

  SET_CURRENT_TAB: 'USER/SET_CURRENT_TAB'
}

export const actions = {
  loadOrders: () => {
    return (dispatch, getState) => {
      const {ids} = getState().user.orders;
      if(ids.length > 0) {
        return null
      }
      const endpoint = url.getOrders();
      return dispatch(fetchOrders(endpint));
    }
  },
  setCurrentTab: index => ({
    type: types.SET_CURRENT_TAB,
    index
  })
}

const fetchOrders = (endpoint) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_ORDERS_REQUEST,
      types.FETCH_ORDERS_SUCCESS,
      types.FETCH_ORDERS_FAILURE
    ],
    endpoint,
    schema
  }
})

//reducers
const orders = (state = initialState.orders, action) => {
  switch(action.type) {
    case types.FETCH_ORDERS_REQUEST:
      return {...state, isFetching: true};
    case types.FETCH_ORDERS_SUCCESS:
      const toBePaidIds = action.response.ids.filter(
        id => action.response.orders[id].type === TO_BE_PAID_TYPE
      );
      const paidIds = action.response.ids.filter(
        id => action.response.orders[id].type === PAID_TYPE
      );
      const refundIds = action.response.ids.filter(
        id => action.response.orders[id].type === REFUND_TYPE
      );
      return {
        ...state,
        isFetching: false,
        ids: state.ids.concat(action.response.ids),
        toBePaidIds: state.toBePaidIds.concat(toBePaidIds),
        paidIds: state.paidIds.concat(paidIds),
        refundIds: state.refundIds.concat(refundIds)
      };
    default:
      return state;
  }
};

const currentTab = (state = initialState.currentTab, action) => {
  switch(action.type){
    case types.SET_CURRENT_TAB:
      return action.index;
    default:
      return state;
  }
}
const reducer = combineReducers({
  currentTab,
  orders
})

export default reducer;