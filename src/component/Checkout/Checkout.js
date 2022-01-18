import React, {Component} from  "react";
import CheckoutSummary from "../../component/Order/CheckoutSummary/CheckoutSummary";
import {Route, Redirect} from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import {connect} from "react-redux";
class Checkout extends Component{
    checkOutCancelled = ()=>{
        this.props.history.goBack();
    }
    checkOutContinued = ()=>{
        this.props.history.replace("/checkout/contact-form");
    }
    render(){
        let summary = <Redirect  to="/" />;
        
        if(this.props.ings){
            const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
               
                <div>
                     {purchaseRedirect}
                    <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkOutCancelled={this.checkOutCancelled}
                    checkOutContinued={this.checkOutContinued}
                />
                <Route 
                path={this.props.match.path + "/contact-form"} 
                component={ContactData} 
            />
        </div>
            ); 
        }
        return summary;
        
    }
}
const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}
export default connect(mapStateToProps)(Checkout);