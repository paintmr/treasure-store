import { combineReducers } from 'redux';
import url from '../../utils/url';
import { FETCH_DATA } from '../middleware/api';
import { schema, PAID_TYPE, TO_BE_PAID_TYPE, REFUND_TYPE, 
    // getOrderById, 
    getAllOrders,
    actions as orderActions, types as orderTypes } from './entities/orders';
import { actions as commentActions } from './entities/comments';
import { createSelector } from 'reselect';

const typeToKey = {
    [TO_BE_PAID_TYPE]: 'toBePaidIds',
    [PAID_TYPE]: 'paidIds',
    [REFUND_TYPE]: 'refundIds'
}

const initialState = {
    orders: {
        isFetching: false,
        fetched: false,
        ids: [],
        toBePaidIds: [],
        paidIds: [],
        refundIds: []
    },
    currentTab: 0,
    currentOrder: {
        id: null,
        isDeleting: false,
        isCommenting: false,
        comment: '',
        stars: 0,
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

    SHOW_COMMENT_AREA: 'USER/SHOW_COMMENT_AREA',
    HIDE_COMMENT_AREA: 'USER/HIDE_COMMENT_AREA',

    SET_COMMENT: 'USER/SET_COMMENT',
    SET_STARS: 'USER/SET_STARS',

    POST_COMMENT_REQUEST: 'USER/POST_COMMENT_REQUEST',
    POST_COMMENT_SUCCESS: 'USER/POST_COMMENT_SUCCESS',
    POST_COMMENT_FAILURE: 'USER/POST_COMMENT_FAILURE',
}

export const actions = {
    loadOrders: () => {
        return (dispatch, getState) => {
            const { fetched } = getState().user.orders;
            if (fetched) {
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
            const { id } = getState().user.currentOrder
            if (id) {
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
    },
    showCommentArea: orderId => ({
        type: types.SHOW_COMMENT_AREA,
        orderId
    }),
    hideCommentArea: () => ({
        type: types.HIDE_COMMENT_AREA
    }),
    setComment: comment => ({
        type: types.SET_COMMENT,
        comment
    }),
    setStars: stars => ({
        type: types.SET_STARS,
        stars
    }),
    submitComment: () => {
        return (dispatch, getState) => {
            dispatch(postCommentRequest());
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const { currentOrder: { id, stars, comment } } = getState().user;
                    const commentObj = {
                        // 提交评论的时候，评论id肯定由服务端生成，这里是个前端项目，自己来模拟自动生成id
                        id: +new Date(),
                        stars: stars,
                        comment: comment,
                    }
                    dispatch(postCommentSuccess());
                    dispatch(orderActions.addComment(id, commentObj.id));
                    dispatch(commentActions.addComment(commentObj));
                    resolve();
                }, 1000)
            })
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

const postCommentRequest = () => ({
    type: types.POST_COMMENT_REQUEST
})

const postCommentSuccess = () => ({
    type: types.POST_COMMENT_SUCCESS
})

//reducers
const orders = (state = initialState.orders, action) => {
    switch (action.type) {
        case types.FETCH_ORDERS_REQUEST:
            return {...state, isFetching: true };
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
                fetched: true,
                ids: state.ids.concat(action.response.ids),
                toBePaidIds: state.toBePaidIds.concat(toBePaidIds),
                paidIds: state.paidIds.concat(paidIds),
                refundIds: state.refundIds.concat(refundIds)
            };
        case types.FETCH_ORDERS_FAILURE:
            return {...state, isFetching: false };
        case types.DELETE_ORDER_SUCCESS:
        case orderTypes.DELETE_ORDER:
            return {
                ...state,
                ids: removeOrderId(state, 'ids', action.orderId),
                toBePaidIds: removeOrderId(state, 'toBePaidIds', action.orderId),
                paidIds: removeOrderId(state, 'paidIds', action.orderId),
                refundIds: removeOrderId(state, 'refundIds', action.orderId),
            }
        case orderTypes.ADD_ORDER:
            const { order } = action;
            const key = typeToKey[order.type];
            return key ? {
                ...state,
                ids: [order.id].concat(state.ids),
                [key]: [order.id].concat(state[key])
            } : {
                ...state,
                ids: [order.id].concat(state.ids)
            }
        default:
            return state;
    }
};

const removeOrderId = (state, key, orderId) => {
    return state[key].filter(id => {
        return id !== orderId
    })
}

const currentTab = (state = initialState.currentTab, action) => {
    switch (action.type) {
        case types.SET_CURRENT_TAB:
            return action.index;
        default:
            return state;
    }
}

const currentOrder = (state = initialState.currentOrder, action) => {
    switch (action.type) {
        case types.SHOW_DELETE_DIALOG:
            return {
                ...state,
                id: action.orderId,
                isDeleting: true
            };
        case types.SHOW_COMMENT_AREA:
            return {
                ...state,
                id: action.orderId,
                isCommenting: true,
            };
        case types.HIDE_DELETE_DIALOG:
        case types.DELETE_ORDER_SUCCESS:
        case types.DELETE_ORDER_FAILURE:
        case types.HIDE_COMMENT_AREA:
        case types.POST_COMMENT_SUCCESS:
        case types.POST_COMMENT_FAILURE:
            return initialState.currentOrder;
        case types.SET_COMMENT:
            return {...state, comment: action.comment };
        case types.SET_STARS:
            return {...state, stars: action.stars };
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

// export const getOrders = state => {
//     const key = ['ids', 'toBePaidIds', 'paidIds', 'refundIds'][state.user.currentTab];
//     return state.user.orders[key].map(id => {
//         return getOrderById(state, id);
//     })
// }
// 用reselect改造上面的函数：
const getUserOrderIDs = state => state.user.orders;

export const getOrders = createSelector(
    [getCurrentTab, getUserOrderIDs, getAllOrders],
    (tabIndex, userOrderIDs, orders) => {
      const key = ['ids', 'toBePaidIds', 'paidIds', 'refundIds'][tabIndex];
      const selectedOrderIds = userOrderIDs[key];
      return selectedOrderIds.map(id => {
        return orders[id];
      })
    }
)


export const getDeletingOrderId = (state) => {
    return state.user.currentOrder && state.user.currentOrder.isDeleting ? state.user.currentOrder.id : null;
}

export const getCommentingOrderId = (state) => {
    return state.user.currentOrder && state.user.currentOrder.isCommenting ? state.user.currentOrder.id : null;
}

export const getCurrentOrderComment = state => {
    return state.user.currentOrder ? state.user.currentOrder.comment : '';
}

export const getCurrentOrderStars = state => {
    return state.user.currentOrder ? state.user.currentOrder.stars : 0;
}