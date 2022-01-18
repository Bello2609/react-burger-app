import React, { Component } from "react";
import Button from "../../../component/UI/Button/Button";
import Spinner from "../../../component/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";
import axios from "../../../axios-order";
import Input from "../../../component/UI/Input/Input";
import {connect} from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as burgerAction from "../../../store/actions/index";

class ContactData extends Component {
    state={
        orderForm: {
            name: {
                elementType: "input",
                elementConfig:{
                    type: "text",
                    placeholder: "your name"
                },
                value: "",
                validation:{
                    required: true
                },
                valid: false,
                touch: false
            },
            street:  {
                elementType: "input",
                elementConfig:{
                    type: "text",
                    placeholder: "Enter street name"
                },
                value: "",
                validation:{
                    required: true
                },
                valid: false,
                touch: false
            },
            zipcode: {
                elementType: "input",
                elementConfig:{
                    type: "text",
                    placeholder: "Zipcode"
                },
                value: "",
                validation:{
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touch: false
            },
            country: {
                elementType: "input",
                elementConfig:{
                    type: "text",
                    placeholder: "Enter country"
                },
                value: "",
                validation:{
                    required: true
                },
                valid: false,
                touch: false
            },
            email: {
                elementType: "input",
                elementConfig:{
                    type: "mail",
                    placeholder: "Your E-mail"
                },
                value: "",
                validation:{
                    required: true,
                    isEmail: true
                },
                valid: false,
                touch: false
            }
        },
        formIsValid: false,
    }
    //this is responsible for sending the order data to the server
    orderHandler = (event)=>{
        event.preventDefault();
           this.setState({
           loading: true
       })
       const formData = {};
       for(let formElementIdentifier in this.state.orderForm){
           formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
       }
       let order = {
        ingredients: this.props.ings,
        price: this.props.tPrice,
        orderData: formData,
        userId: this.props.userId
    }
    console.log(this.props.ingredients)
    //sending request to the server
   this.props.onBurgerOrder(order, this.props.token);
    console.log(order);
}
//this function is responsible when a user enter any text in the form field
inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
        ...this.state.orderForm
    };
    const updatedFormElement = { 
        ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touch = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
        formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    console.log(formIsValid);
    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
}

//this is responsible for checking validity
checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
        return true;
    }
    
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}
       
    render(){
        const formElementArray = [];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                    {formElementArray.map(formElement =>(
                         <Input 
                         key={formElement.id}
                         elementType={formElement.config.elementType}
                         elementConfig={formElement.config.elementConfig}
                         value={formElement.config.value}
                         invalid={!formElement.config.valid}
                         shouldValidate={formElement.config.validation}
                         touch={formElement.config.touch}
                         changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                    ))}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
                </form>
        );
        if(this.props.loading){
            form = <Spinner />;
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact data here</h4>
                {form}
            </div>
        );

    }
}
const mapStateToProps = state=>{
    return{
        ings: state.burgerBuilder.ingredients,
        tPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.localId
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onBurgerOrder: (orderData, token)=> dispatch(burgerAction.purchaseBurger(orderData, token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));