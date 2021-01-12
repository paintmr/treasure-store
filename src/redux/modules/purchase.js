import { createSelector } from 'reselect';
import { getProductDetail } from './entities/products';
import { TO_BE_PAID_TYPE, actions as orderActions } from './entities/orders';

const initialState = {
    quantity: 1,
    showTip: false,
}

export const types = {
    SET_ORDER_QUANTITY: 'PURCHASE/SET_ORDER_QUANTITY',
    CLOSE_TIP: 'PURCHASE/CLOSE_TIP',

    SUBMIT_ORDER_REQUEST: 'PURCHASE/SUBMIT_ORDER_REQUEST',
    SUBMIT_ORDER_SUCCESS: 'PURCHASE/SUBMIT_ORDER_SUCCESS',
    SUBMIT_ORDER_FAILURE: 'PURCHASE/SUBMIT_ORDER_FAILURE',
}

export const actions = {
    setOrderQuantity: quantity => ({
        type: types.SET_ORDER_QUANTITY,
        quantity
    }),
    closeTip: () => ({
        type: types.CLOSE_TIP
    }),
    submitOrder: productId => {
        return (dispatch, getState) => {
            dispatch({ type: types.SUBMIT_ORDER_REQUEST }); //也可以把{type: types.SUBMIT_ORDER_REQUEST}封装到普通的action creator中
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const product = getProductDetail(getState(), productId);
                    const quantity = getState().purchase.quantity;
                    const totalPrice = (product.currentPrice * quantity).toFixed(1);
                    const text1 = `${quantity} coupon | Total price：${totalPrice}`
                    const text2 = product.validityPeriod;
                    const order = {
                        title: `${product.shop}:${product.product}`,
                        orderPicUrl: product.picture,
                        channel: 'Group Buying',
                        statusText: 'To Be Paid',
                        text: [text1, text2],
                        type: TO_BE_PAID_TYPE
                    }
                    dispatch(orderActions.addOrder(order));
                    dispatch({ type: types.SUBMIT_ORDER_SUCCESS });
                }, 500)
            })
        }
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_ORDER_QUANTITY:
            return {...state, quantity: action.quantity }
        case types.SUBMIT_ORDER_SUCCESS:
            return {...state, showTip: true }
        case types.CLOSE_TIP:
            return {...state, showTip: false }
        default:
            return state;
    }
}

export default reducer;

export const getQuantity = (state) => {
    return state.purchase.quantity
}

export const getTipStatus = (state) => {
    return state.purchase.showTip
}

//不让视图层的组件感知Redux中的entities，所以用purchase里的selector函数调用entities中的函数
export const getProduct = (state, id) => {
    return getProductDetail(state, id)
}

// 使用reselect库中提供的createSelector来创建具有缓存功能的selector函数。createSelector接收2个参数。第1个参数是数组，数组中的每一个元素都是一个selector函数。第2个参数是个函数，这个函数中接收到的参数是前面的selector函数返回的结果。
export const getTotalPrice = createSelector(
    [getProduct, getQuantity],
    (product, quantity) => {
        if (!product) {
            return 0;
        }
        return (product.currentPrice * quantity).toFixed(1);
    }
)