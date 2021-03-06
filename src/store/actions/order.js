import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

//sucessful burger purchase
export const purchaseBurgerSuccess = (id, orderData)=>{
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}
//failed burger purchase
export const purchaseBurgerFail = (error)=>{
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}
//purchasing start
export const purchaseBurgerStart = ()=> {
    return{
        type: actionTypes.PURCHASE_BURGER_START
    }
}
export const purchaseBurger = (orderData, token)=>{
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post("/orders.json?auth=" + token, orderData).then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        }).catch( error => purchaseBurgerFail(error));
    }
}
//initialize purchase
export const purchaseInit = ()=> {
    return{
        type: actionTypes.PURCHASE_INIT
    }
}
//fetch order success
export const fetchOrderSuccess = (orders)=>{
    return{
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

//fetch order fail
export const fetchOrderFail = (error)=> {
    return{
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
}
//fetch order start
export const fetchOrderStart = ()=> {
    return{
        type: actionTypes.FETCH_ORDER_START
    }
}
export const fetchOrder = (token, userId) =>{
    return dispatch =>{
        dispatch(fetchOrderStart());
        const queryParams = '?auth' + token + '&orderBy="userId"&equalTo="' + userId + '"'
        axios.get("/orders.json" + queryParams).then( response =>{
            const fetchedOrder = [];
            for(let key in response.data){
                fetchedOrder.push({
                    ...response.data[key],
                    id:key
                });
            }
           dispatch(fetchOrderSuccess(fetchedOrder))
        }).catch(error => {
            dispatch(fetchOrderFail(error))
        });
    }
}
