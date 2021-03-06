import React, { Component } from "react";
import Aux from "../Aux[1]";
import {connect} from "react-redux";
import classes from "./Layout.module.css";
import Toolbar from "../../component/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../component/Navigation/SideDrawer/SideDrawer";
class Layout extends Component{
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = ()=>{
        this.setState({
            showSideDrawer: false
        })
    }
    sideDrawerToggleHandler = ()=>{
        this.setState(prevState=>{
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }
    render(){
        return(
            <Aux>
                <Toolbar isAuth = {this.props.isAuthenticated} drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer isAuth = {this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
} 

const mapStateToProps = state =>{
    return{
        isAuthenticated: state.auth.token !== ""
    }
}


export default connect( mapStateToProps )(Layout);