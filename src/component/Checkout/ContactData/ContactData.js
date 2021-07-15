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
                    required: true
                },
                valid: false,
                touch: false
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig:{
                    options: [
                            {value: "fastest", displayValue: "Fastest"},
                            {value: "cheapest", displayValue: "Cheapest"}            
                ]
                },
                value: "fastest",
                validation:{},
                valid: true
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
        orderData: formData
    }
    console.log(this.props.ingredients)
    //sending request to the server
   this.prop.onBurgerOrder(order);
    console.log(order);
}
//this function is responsible when a user enter any text in the form field
inputChangedHandler = (event, formElementIdentifier)=>{
    const updatedOrderForm = {
        ...this.state.orderForm
    };
    const updatedFormElement = {
        ...updatedOrderForm[formElementIdentifier]
    }
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touch = true;
    updatedOrderForm[formElementIdentifier] = updatedOrderForm;
    let formIsValid = true;
    for(let inputIdentifier in updatedFormElement){
        formIsValid = updatedFormElement[inputIdentifier].valid && formIsValid;
    }
    this.setState({orderForm: updatedOrderForm,
        formIsValid: formIsValid
    });
}
//this is responsible for checking validity
checkValidity = (value, rules)=>{
    let isValid = true;
    if(!rules){
        return true;
    }
    if(rules.required){
        isValid = value.trim() !== "" && isValid;
    }
    if(rules.minLength){
        isValid = value.trim() >= rules.minLength && isValid;
    }
    if(rules.maxLength){
        isValid = value.trim() <= rules.maxLength && isValid;
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
        if(this.state.loading){
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
        loading: state.order.loading
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onBurgerOrder: (orderData)=> dispatch(burgerAction.purchaseBurger(orderData))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));