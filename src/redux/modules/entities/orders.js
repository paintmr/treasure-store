import createReducer from '../../../utils/createReducer';

export const schema = {
  name: 'orders',
  id: 'id',
}

export const PAID_TYPE = 1;
export const TO_BE_PAID_TYPE  = 2;
export const REFUND_TYPE = 3;

export const types = {
  DELETE_ORDER: 'ORDERS/DELETE_ORDER'
}

export const actions = {
  deleteOrder: (orderId) => ({
    type: types.DELETE_ORDER,
    orderId
  })
}

const normalReducer = createReducer(schema.name)

const reducer = (state = {}, action) => {
  if(action.type === types.DELETE_ORDER) {
    const {[action.orderId] : deleteOrder, ...restOrders} = state;
    return restOrders;
  } else {
    return normalReducer(state, action);
  }
}

export default reducer;

//selectors
export const getOrderById = (state, id) => {
  return state.entities.orders[id]
}