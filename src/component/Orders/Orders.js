import React, { Component } from "react";
import Order from "../../component/Order/Order";
import axios from "../../axios-order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
class Orders extends Component{
    state = {
        orders: [],
        loading: false
    }
    componentDidMount(){
        
       
    }
    render(){
        return(
            <div>
             {this.state.orders.map(order => (
                 <Order 
                 key={order.id} 
                 ingredients={order.ingredients}
                 price={order.price} />
             ))}
            </div>
        );
    }
}
export default withErrorHandler(Orders, axios);