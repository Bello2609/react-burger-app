export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
//this action types will be fectching ingredients data from the store
export const SET_INGREDIENT = "SET_INGREDIENT";
export const FETCH_INGREDIENT_FAILED = "FETCH_INGREDIENT_FAILED";
//this action will be sending burger data to the database
export const PURCHASE_BURGER_START = "PURCHASE_BURGER_START"
export const PURCHASE_BURGER_SUCCESS = "PURCHASE_INGREDIENT_SUCCESS";
export const PURCHASE_BURGER_FAIL = "PURCHASE_INGREDIENT_FAIL";
export const PURCHASE_INIT = "PURCHASE_INIT";

//this are the action that will fetch data after it has been submittefd to the database(order history)
export const FETCH_ORDER_START = "FETCH_ORDER_START"
export const FETCH_ORDER_SUCCESS = "FETCH_ORDER_SUCCESS";
export const FETCH_ORDER_FAIL = "FETCH_ORDER_FAIL";

//this will send the input value to the server
export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

//this action is for redirecting user that is not yet authenticated but wanna purchase
export const SET_AUTH_REDIRECT_PATH = "SET_AUTH_REDIRECT_PATH";