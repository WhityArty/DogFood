import api from "../../utils/api";
import { GET_USER } from "../types/types";

export function getUser(payload) {
    return {
        type: GET_USER,
        payload
    }
}

export function userIsLoading(isLoading) {
    return {
        type: 'USER_SET_IS_LOADING',
        payload: isLoading
    }
}

export function getUserTmp(payload) {
    return {
        type: 'GET_USER_TMP',
        payload
    }
}

export function getUserData() {
    return (dispatch, getState) => {
        dispatch(userIsLoading(true));
        api
            .getUserInfo()
            .then((data) => dispatch(getUser(data)))
            .finally(() => dispatch(userIsLoading(false)))
    }
}