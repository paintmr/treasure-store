import createReducer from '../../../utils/createReducer';
import { types } from '../detail';

export const schema = {
  name: 'shops',
  id: 'id'
}

const reducer = createReducer(schema.name);

export default reducer;

//selectors
export const getShopById = (state, id) => {
  const shop = state.entities.shop[id];
  return shop;
}