import api from "../../utils/api";


export function addAllProducts(payload) {
    return {
        type: 'PRODUCTS_ALL_ADD',
        payload
    }
}

export function productsIsLoading(isLoading) {
    return {
        type: 'PRODUCT_SET_IS_LOADING',
        payload: isLoading
    }
}

export function getAllProducts(pay) {
    console.log({ pay })
    return (dispatch, getState) => {
        //  const {user } = getState()
        dispatch(productsIsLoading(true));
        api
            .getProductsList()
            .then((data) => dispatch(addAllProducts({...data, pay })))
            .finally(() => dispatch(productsIsLoading(false)))
    }
}