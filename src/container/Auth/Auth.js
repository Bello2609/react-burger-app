import React, { Component } from "react";
import Input from "../../component/UI/Input/Input";
import Button from "../../component/UI/Button/Button";
import Spinner from "../../component/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import * as authAction from "../../store/actions/index";
class Auth extends Component{
    state = {
        controls:{
            email: {
                elementType: "input",
                elementConfig:{
                    type: "email",
                    placeholder: "Email"
                },
                value: "",
                validation:{
                    required: true,
                    isEmail: true
                },
                valid: false,
                touch: false
            },
            password: {
                elementType: "input",
                elementConfig:{
                    type: "password",
                    placeholder: "Password"
                },
                value: "",
                validation:{
                    required: true,
                    minLength: 6
                },
                valid: false,
                touch: false
            }
        },
        isSignUp: true
    }
    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath !== "/"){
            this.props.onSetAuthRedirectToPath();
        }
    }

    inputChangedHandler = (event, controlName)=>{
        const updatedControl = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
                
            }
        }
        this.setState({
            controls: updatedControl
        })
    }
    switchAuthModeHandler = () =>{
        this.setState(prevState=>{
            return{isSignUp: !prevState.isSignUp}
        })
    }
    submitHandler = (event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }
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
        let isRedirect = null;
        if(this.props.isAuthenticated){
            isRedirect = <Redirect to={this.props.onSetAuthRedirectPath} />
        }
        const formElementArray = [];
        for(let key in this.state.controls){
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = formElementArray.map(formElement => (
            <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig} 
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touch={formElement.config.touch}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />  
        )
        )
            if(this.props.loading){
                form = <Spinner />
            }
        return(
            <div className={classes.Auth}>
                {isRedirect}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                    <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">
                        SWITCH TO {this.state.isSignUp ? "SIGNIN" : "SIGNUP"}
                    </Button>
                </form>

            </div>
        );
    }
}
const mapStateToProps = state =>{
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== "",
        buildingBurger: state.burgerBuilder.building,
        authRedirectToPath: state.auth.authRedirectPath 
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onAuth: (email, password, isSignUp)=> dispatch(authAction.auth(email, password, isSignUp)),
        onSetAuthRedirectToPath: ()=> dispatch(authAction.setAuthRedirectPath("/"))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);