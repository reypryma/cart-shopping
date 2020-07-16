import {FETCH_PRODUCTS, FILTER_PRODUCTS_BY_SIZE} from "../utils/types";

export const fetchProducts = () => async (dispatch) => {
    const res = await fetch("/api/products");
    const data = await res.json();
    console.log(data);
    dispatch({
        type: FETCH_PRODUCTS,
        payload: data,
    });
};

export const filterProducts = (products, size) => (dispatch) => {
    dispatch({
        type: FILTER_PRODUCTS_BY_SIZE,
        payload: {
            size: size,
            items:
                size === ""
                    ? products
                    : products.filter((x) => x.availableSizes.indexOf(size) >= 0),
        },
    });
};
