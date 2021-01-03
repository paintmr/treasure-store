import { combineReducers } from 'redux';
import url from '../../utils/url';
import {FETCH_DATA} from '../middleware/api';
import {schema, PAID_TYPE, TO_BE_PAID_TYPE, REFUND_TYPE, getOrderById , actions as orderActions, types as orderTypes} from './entities/orders';

const initialState = {
  orders: {
    isFetching: false,
    ids: [],
    toBePaidIds: [],
    paidIds: [],
    refundIds: []
  },
  currentTab: 0,
  currentOrder: {
    id: null,
    idDeleting: false,
  }
}

export const types = {
  FETCH_ORDERS_REQUEST: 'USER/FETCH_ORDERS_REQUEST',
  FETCH_ORDERS_SUCCESS: 'USER/FETCH_ORDERS_SUCCESS',
  FETCH_ORDERS_FAILURE: 'USER/FETCH_ORDERS_FAILURE',

  SET_CURRENT_TAB: 'USER/SET_CURRENT_TAB',

  SHOW_DELETE_DIALOG: 'USER/SHOW_DELETE_DIALOG',
  HIDE_DELETE_DIALOG: 'USER/HIDE_DELETE_DIALOG',

  DELETE_ORDER_REQUEST: 'USER/DELETE_ORDER_REQUEST',
  DELETE_ORDER_SUCCESS: 'USER/DELETE_ORDER_SUCCESS',
  DELETE_ORDER_FAILURE: 'USER/DELETE_ORDER_FAILURE',
}

export const actions = {
  loadOrders: () => {
    return (dispatch, getState) => {
      const {ids} = getState().user.orders;
      if(ids.length > 0) {
        return null
      }
      const endpoint = url.getOrders();
      return dispatch(fetchOrders(endpoint));
    }
  },
  setCurrentTab: index => ({
    type: types.SET_CURRENT_TAB,
    index
  }),
  showDeleteDialog: orderId => ({
    type: types.SHOW_DELETE_DIALOG,
    orderId
  }),
  hideDeleteDialog: () => ({
    type: types.HIDE_DELETE_DIALOG,
  }),
  removeOrder: () => {
    return (dispatch, getState) => {
      const {id} = getState().user.currentOrder
      if(id) {
        dispatch(deleteOrderRequest());
        //通过promise来模拟后端删除数据库数据
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            dispatch(deleteOrderSuccess(id));
            //不仅要删除user里面的order id，还要根据id去order里面删除相关的order
            dispatch(orderActions.deleteOrder(id));
            resolve()
          }, 500)
        })
      }
    }
  }
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

const deleteOrderRequest = () => ({
  type: types.DELETE_ORDER_REQUEST
})

const deleteOrderSuccess = (orderId) => ({
  type: types.DELETE_ORDER_SUCCESS,
  orderId
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
    case types.FETCH_ORDERS_FAILURE:
      return {...state, isFetching: false};
    case types.DELETE_ORDER_SUCCESS:
    case orderTypes.DELETE_ORDER:
      return {
        ...state,
        ids: removeOrderId(state, 'ids', action.orderId),
        toBePaidIds: removeOrderId(state, 'toBePaidIds', action.orderId),
        paidIds: removeOrderId(state, 'paidIds', action.orderId),
        refundIds: removeOrderId(state, 'refundIds', action.orderId),
      }
    default:
      return state;
  }
};

const removeOrderId = (state, key, orderId) => {
  return state[key].filter(id => {
    return id !==orderId
  })
}

const currentTab = (state = initialState.currentTab, action) => {
  switch(action.type){
    case types.SET_CURRENT_TAB:
      return action.index;
    default:
      return state;
  }
}

const currentOrder = (state= initialState.currentOrder, action) => {
  switch(action.type) {
    case types.SHOW_DELETE_DIALOG:
      return {
        ...state,
        id: action.orderId,
        isDeleting: true
      }
    case types.HIDE_DELETE_DIALOG:
    case types.DELETE_ORDER_SUCCESS:
    case types.DELETE_ORDER_FAILURE:
      return initialState.currentOrder
    default:
      return state;
  }
}

const reducer = combineReducers({
  currentTab,
  orders,
  currentOrder
})

export default reducer;

//selectors
export const getCurrentTab = state => {
  return state.user.currentTab
}

export const getOrders = state => {
  const key = ['ids', 'toBePaidIds', 'paidIds', 'refundIds'][state.user.currentTab];
  return state.user.orders[key].map(id => {
    return getOrderById(state, id);
  })
}

export const getDeletingOrderId = (state) => {
  return state.user.currentOrder && state.user.currentOrder.isDeleting ? state.user.currentOrder.id : null;
}