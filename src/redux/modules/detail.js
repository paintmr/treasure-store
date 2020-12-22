import url from '../../utils/url';
import {FETCH_DATA} from '../middleware/api';
import {schema as productSchema, getProductDetail} from './entities/products';
import {schema as shopSchema, getShopById} from './entities/shops';

export const types = {
  FETCH_PRODUCT_DETAIL_REQUEST:
  'DETAIL/FETCH_PRODUCT_DETAIL_REQUEST',
  FETCH_PRODUCT_DETAIL_SUCCESS:
  'DETAIL/FETCH_PRODUCT_DETAIL_SUCCESS',
  FETCH_PRODUCT_DETAIL_FAILURE:
  'DETAIL/FETCH_PRODUCT_DETAIL_FAILURE',
  FETCH_SHOP_REQUEST:
  'DETAIL/FETCH_SHOP_REQUEST',
  FETCH_SHOP_SUCCESS:
  'DETAIL/FETCH_SHOP_SUCCESS',
  FETCH_SHOP_FAILURE:
  'DETAIL/FETCH_SHOP_FAILURE',
}

const initialState = {
  product: {
    isFetching: false,
    id: null,
  },
  relatedShop: {
    isFetching: false,
    id: null,
  }
}

export const actions = {
  loadProductDetail:  id => {
    return (dispatch, getState) => {
      const product = getProductDetail(getState(), id);
      if(product) {
        return dispatch(fetchProductDetailSuccess(id))
      }
      const endpoint = url.getProductDetail(id);
      return dispatch(fetchProductDetail(endpoint, id));
    }
  },
  loadShopById: id => {
    return (dispatch, getState) => {
      const shop = getShopById(getState(), id);
      if(shop) {
        return dispatch(fetchShopSuccess(id))
      }
      const endpoint = url.getShopById(id);
      return dispatch(fetchShopById(endpoint, id));
    }
  }
}

const fetchProductDetail = (endpoint, id) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_PRODUCT_DETAIL_REQUEST,
      types.FETCH_PRODUCT_DETAIL_SUCCESS,
      types.FETCH_PRODUCT_DETAIL_FAILURE,
    ],
    endpoint,
    schema: productSchema
  },
  id
})

const fetchProductDetailSuccess = (id) => ({
  types: types.FETCH_PRODUCT_DETAIL_SUCCESS,
  id,
})

const fetchShopById = (endpoint, id) => ({
  [FETCH_DATA]: {
    types: [
      types.FETCH_SHOP_REQUEST,
      types.FETCH_SHOP_SUCCESS,
      types.FETCH_SHOP_FAILURE,
    ],
    endpoint,
    schema: shopSchema
  },
  id
})

const fetchShopSuccess = (id) => ({
  types: types.FETCH_SHOP_SUCCESS,
  id,
})

const reducer = (state = {}, action) => {
  return state;
}

export default reducer;