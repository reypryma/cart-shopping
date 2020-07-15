import {FETCH_PRODUCT} from "../utils/types";

const productsReducer = (state = {}, action) =>{
    switch (action.type) {
        case FETCH_PRODUCT:
            return {items:action.payload};
        default:
            return state;
    }
};