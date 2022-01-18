import React, { Component } from "react";
import Order from "../../component/Order/Order";
import axios from "../../axios-order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
import * as action from "../../store/actions/index";
import Spinner from "../UI/Spinner/Spinner"
class Orders extends Component{
    componentDidMount(){
       this.props.onFetchOrder(this.props.token, this.props.userId);
    }
    render(){
        let order = <Spinner />
        if(!this.props.loading){
            order = (
                <div>
                    {this.props.orders.map(order => (
                    <Order 
                    key={order.id} 
                    ingredients={order.ingredients}
                    price={order.price} />
             ))}
            </div>
            );
        }
        return order;
    }
}

const mapStateToProps = state =>{
    return{
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.localId

    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onFetchOrder: (token, userId)=> dispatch(action.fetchOrder(token, userId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));