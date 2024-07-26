import axios from "axios";
import { Action } from "./ProductContextConsts";
import { ProductPayload } from "../../Models/Models";


export const PostProduct = async (dispatch: React.Dispatch<Action>, product: ProductPayload) => {
    dispatch({ type: "POST REQUEST" });
    try {
        const response = await axios.post('http://localhost:5000/api/products', product);
        dispatch({ type: "POST SUCCESS", payload: response.data.createdProduct });
        return response.data.createdProduct._id;
    } catch (error) {
        dispatch({ type: "POST FAILURE" });
        console.log(error);
    }
};


export const FetchAllProducts = async (dispatch: React.Dispatch<Action>) => {
    dispatch({ type: "FETCH REQUEST" });
    try {
        const response = await axios.get('http://localhost:5000/api/products');
        dispatch({ type: "FETCH SUCCESS", payload: response.data.products });
    } catch (error) {
        dispatch({ type: "FETCH FAILURE" });
        console.log(error);
    }
};


export const FetchProductsByCategory = async (dispatch: React.Dispatch<Action>, category: string) => {
    dispatch({ type: "FETCH_BY_CATEGORY REQUEST" });
    try {
        const response = await axios.get(`http://localhost:5000/api/products/category/${category}`);
        dispatch({ type: "FETCH_BY_CATEGORY SUCCESS", payload: response.data.products });
        return response.data.products
    } catch (error) {
        dispatch({ type: "FETCH_BY_CATEGORY FAILURE" });
        console.log(error);
    }
};


export const FetchMostPopularProducts = async (dispatch: React.Dispatch<Action>) => {
    dispatch({ type: "FETCH_POPULAR REQUEST" });
    try {
        const response = await axios.get('http://localhost:5000/api/products/popular');
        dispatch({ type: "FETCH_POPULAR SUCCESS"});
        return response.data.products
    } catch (error) {
        dispatch({ type: "FETCH_POPULAR FAILURE" });
        console.log(error);
    }
};


export const FetchRecentlyAddedProducts = async (dispatch: React.Dispatch<Action>) => {
    dispatch({ type: "FETCH_RECENT REQUEST" });
    try {
        const response = await axios.get('http://localhost:5000/api/products/recent');
        dispatch({ type: "FETCH_RECENT SUCCESS" });
        return response.data.products
    } catch (error) {
        dispatch({ type: "FETCH_RECENT FAILURE" });
        console.log(error);
    }
};


export const DeleteProduct = async (dispatch: React.Dispatch<Action>, productId: string) => {
    dispatch({ type: "DELETE REQUEST" });
    try {
        await axios.delete(`http://localhost:5000/api/products/${productId}`);
        dispatch({ type: "DELETE SUCCESS", payload: productId });
    } catch (error) {
        dispatch({ type: "DELETE FAILURE" });
        console.log(error);
    }
};


export const UpdateProduct = async (dispatch: React.Dispatch<Action>, productId: string, updatedProduct: ProductPayload) => {
    dispatch({ type: "UPDATE REQUEST" });
    try {
        const response = await axios.patch(`http://localhost:5000/api/products/${productId}`, updatedProduct);
        dispatch({ type: "UPDATE SUCCESS", payload: response.data.updatedProduct });
    } catch (error) {
        dispatch({ type: "UPDATE FAILURE" });
        console.log(error);
    }
};
