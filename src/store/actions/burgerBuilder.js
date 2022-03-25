import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";
export const addIngredient = (name)=>{
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}
export const removeIngredient = (name) =>{
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}
export const fetch_ingredient_failed = ()=>{
    return{
        type: actionTypes.FETCH_INGREDIENT_FAILED
    }
}
export const set_ingredient = (ingredients)=>{
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    }
}
export const initIngredient = ()=>{
    return dispatch =>{
        axios.get("https://my-react-burger-ec96c.firebaseio.com/ingredient.json").then(response=>{
            dispatch(set_ingredient(response.data));
        }).catch( dispatch(fetch_ingredient_failed()));
        
    }
}