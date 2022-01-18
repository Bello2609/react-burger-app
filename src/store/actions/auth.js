import * as actionTypes from "./actionTypes";
import axios from "axios";
//localId is also the same as userID
export const auth_start = ()=>{
    return{
        type: actionTypes.AUTH_START
    }
}
export const auth_success = (token, localId)=>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        tokenId: token,
        localId: localId
    }
}
export const auth_fail = (error)=>{
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}
 export const setAuthRedirectPath = (path)=>{
     return {
         type: actionTypes.SET_AUTH_REDIRECT_PATH,
         path: path
     }
 }
export const logout = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}
//this will check if the user is still authenticated or not
export const checkAuthState = ()=>{
    return dispatch=>{
        const token = localStorage.getItem("token");
        if(!token){
            dispatch(logout());
        }else{
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
            if(expirationDate <= new Date()){
                dispatch(logout());
            }
            else{
                const userId = localStorage.getItem("userId");
                dispatch(auth_success(token, userId));
                dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime())/1000))
            }
        }
    }
}
export const checkAuthTimeOut = (expirationTime)=>{
   return dispatch =>{
       setTimeout(()=>{
        dispatch(logout());
       }, expirationTime * 1000)
       
   }
}

export const auth = (email, password, isSignUp)=>{
    return dispatch =>{
        dispatch(auth_start());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBqPzZ1bUm15pNLdytV7E7Py_w-ry6N0X8"
        if(!isSignUp){
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBqPzZ1bUm15pNLdytV7E7Py_w-ry6N0X8"
        }
        axios.post(url, authData)
        .then(res=>{
            console.log(res.data)
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
            //save the token to localstorage
            localStorage.setItem("token", res.data.idToken);
            localStorage.setItem("expirationDate", expirationDate);
            localStorage.setItem("userId", res.data.localId)
            dispatch(auth_success(res.data.idToken, res.data.localId));
            dispatch(checkAuthTimeOut(res.data.expiresIn));
        }).catch(err=>{
            dispatch(auth_fail(err));
        });


    }
}








