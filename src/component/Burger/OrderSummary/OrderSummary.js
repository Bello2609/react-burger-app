import React, { Component } from "react";
import Aux from "../../../hoc/Aux[1]";
import Button from "../../UI/Button/Button"
class OrderSummary extends Component {
    componentWillUpdate(){
        console.log("[OrderSummary.js] willUpdate");
    }
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(igkeys =>{
            return (
                <li key={igkeys}><span style={{textTransform: "capitalize"}}>{igkeys}</span>: {this.props.ingredients[igkeys]}</li>
            );
        })
        return (
            <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredient:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
            <p>Continue To Check out</p>
            <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </Aux>
        );
    }
}

export default OrderSummary;