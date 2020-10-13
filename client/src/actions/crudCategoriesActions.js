import {
  GET_ALL_CATEGORIES,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from "../constants/crudCategoriesConstants";
import axios from "axios";

export const getAllCategories = () => (dispatch) => {
  axios.get("http://localhost:4000/category").then((res) => {
    dispatch({ type: GET_ALL_CATEGORIES, payload: res.data });
  });
};

export const creteCategory = () => (dispatch) => {
  axios.post("http://localhost:4000/category", category).then((res) => {
    dispatch({ type: CREATE_CATEGORY, payload: res.data });
  });
};

export const deleteCategory = () => (dispatch) => {
  axios.delete(`http://localhost:4000/category/${id}`).then((res) => {
    dispatch({ type: DELETE_CATEGORY, payload: id });
  });
};

export const updateCategory = (id, category) => (dispatch) => {
  axios.put(`http://localhost:4000/category/${id}`, category).then((res) => {
    dispatch({ type: UPDATE_CATEGORY, payload: res.data });
  });
};