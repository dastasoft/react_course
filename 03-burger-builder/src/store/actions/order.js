import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData
    };
};

const purchaseBurgerFail = error => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error
    };
};

const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = orderData => dispatch => {
    dispatch(purchaseBurgerStart());
    axios
        .post('/orders.json', orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error));
        });
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

const fetchOrdersSuccess = orders => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    };
};

const fetchOrdersFail = error => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error
    };
};

const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = () => dispatch => {
    dispatch(fetchOrdersStart());
    axios
        .get('/orders.json')
        .then(response => {
            const fetchedOrders = Object.entries(response.data).map(order => {
                return {
                    ...order[1],
                    id: order[0]
                };
            });

            dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch(error => {
            dispatch(fetchOrdersFail(error));
        });
};
