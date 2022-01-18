import React, { Component } from "react";
import Aux from "../../hoc/Aux[1]";
import Burger from "../../component/Burger/Burger";
import BuildControls from "../../component/Burger/BuildControls/BuildControls";
import Modal from "../../component/UI/Modal/Modal";
import OrderSummary from "../../component/Burger/OrderSummary/OrderSummary";
import Spinner from "../../component/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-order";
import {connect} from "react-redux";
import * as burgerBuilderAction from "../../store/actions/index";


class BurgerBuilder extends Component{
    state = {
        purchasing: false
    }
    componentDidMount(){
        console.log(this.props);
        this.props.onInitIngredients();
    }
    updatePurchaseState(ingredients){
        
        const sum = Object.keys(ingredients).map(igKeys =>{
            return ingredients[igKeys]
        }).reduce((sum, el)=>{
            return sum + el
        }, 0)
            return sum > 0
        
    }
    purchaseHandler = ()=>{
        if(this.props.isAuthenticated){
            this.setState({purchasing: true})
        } else {
            this.props.onSetAuthRedirectPath("/checkout");
            this.props.history.push("/auth");
        }
        
    }
    purchaseCancelHandler = ()=>{
        this.setState({
            purchasing: false
        });
    }
    purchaseContinueHandler = ()=>{
        this.props.onPurchaseInit();
        this.props.history.push("/checkout") 
    }
    render(){
        const disabledInfo = {
            ...this.props.ings
        } 
        for(let keys in disabledInfo){
            console.log(keys);
            disabledInfo[keys] = disabledInfo[keys] <= 0;
        }
        //this will create a spinner when the data is being sent to ht e server
        let orderSummary =  null;
        
        //am getting the ingredient from the backend 
        let burger = this.props.error ? <p>ingredient can't be loaded</p> : <Spinner />;
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                        <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded} 
                        ingredientRemoved={this.props.onIngredientRemove}
                        disabled={disabledInfo} 
                        price={this.props.tPrice} 
                        isAuth={this.props.isAuthenticated}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler} />
                </Aux>
            ); 
            orderSummary =  <OrderSummary ingredients={this.props.ings}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.props.tPrice} />
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        tPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== "",


    };
}
const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdded: (ingName)=> dispatch(burgerBuilderAction.addIngredient(ingName)),
        onIngredientRemove: (ingName)=> dispatch(burgerBuilderAction.removeIngredient(ingName)),
        onInitIngredients: ()=> dispatch(burgerBuilderAction.initIngredient()),
        onPurchaseInit: ()=> dispatch(burgerBuilderAction.purchaseInit()),
        onSetAuthRedirectPath: (path)=> dispatch(burgerBuilderAction.setAuthRedirectPath(path))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));