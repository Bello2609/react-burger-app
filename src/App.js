import React, { Component } from 'react';
import './App.css';
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
import Checkout from "./component/Checkout/Checkout";
import {Route, Switch} from "react-router-dom";
import Orders from "./component/Orders/Orders";
class App extends Component{
  render(){
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
         </Switch>
       </Layout>
      </div>
    );
  }
}

export default App;