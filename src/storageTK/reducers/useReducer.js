import { GET_USER } from "../types/types";


const initialState = {
    user: {},
    isLoading: false,
    tmp: 'hello'
}

function userReducer(state = initialState, action) {
    console.log({ action });
    switch (action.type) {
        case GET_USER:
            return { ...state, user: action.payload }
        case "USER_SET_IS_LOADING":
            return { ...state, isLoading: action.payload }
        case "GET_USER_TMP":
            return { ...state, tmp: action.payload }

        default:
            return state;
    }

}

export default userReducer;