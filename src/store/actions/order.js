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
export const purchaseBurger = (orderData)=>{
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post("/order.json", orderData).then(response => {
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

//fetch order init
export const fetchOrderInit = ()=>{
    return{
        type: actionTypes.FETCH_ORDER_INIT
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
export const fetchOrder = () =>{
    return dispatch =>{
        dispatch(fetchOrderStart());
        axios.get("/orders.json").then( response =>{
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
