import {FETCH_PRODUCT} from "../utils/types";

export const fetchActions = () => async (dispatch) => {
    const res = await fetch("/api/products")
    //dispatch as action
    dispatch({
        type: FETCH_PRODUCT,
        payload: res.data,
    })
};