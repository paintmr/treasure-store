import createReducer from '../../../utils/createReducer';

export const schema = {
  name: 'orders',
  id: 'id',
}

export const PAID_TYPE = 1;
export const TO_BE_PAID_TYPE  = 2;
export const REFUND_TYPE = 3;

const reducer = createReducer(schema.name)

export default reducer;