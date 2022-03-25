import * as actionTypes from "../actions/actionTypes";
const initialState = {
    token: "",
    localId: "",
    loading: false,
    error: "",
    authRedirectPath: "/"
}
const reducer = (state=initialState, action)=>{
    switch(action.type){
        case actionTypes.AUTH_START:
            return{
                ...state,
                loading: true
            }
            case actionTypes.AUTH_SUCCESS:
                return{
                    ...state,
                    token: action.tokenId,
                    localId: action.localId,
                    loading: false
                }
                case actionTypes.AUTH_FAIL:
                    return{
                        ...state,
                        loading: false,
                        error: action.error
                    }
                case actionTypes.AUTH_LOGOUT:
                    return{
                        ...state,
                        token: "",
                        localId: ""
                    }
                    case actionTypes.SET_AUTH_REDIRECT_PATH:
                        return{
                            ...state,
                            authRedirectPath: action.path
                        }
        default:
            return state
    }
}
export default reducer;