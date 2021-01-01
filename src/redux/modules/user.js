import url from '../../utils/url';
import {FETCH_DATA} from '../middleware/api';
import {schema} from './entities/orders';

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