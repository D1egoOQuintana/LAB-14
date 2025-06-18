import axios from "axios";

const PREFIX_URL = 'http://localhost:8000/series/api/v1/categories/'; 

export const getAllCategoryService = async () => {
    const response = await axios.get(PREFIX_URL);
    return response;
};

export const createCategoryService = async (data) => {
    const response = await axios.post(PREFIX_URL, data);
    return response;
};

export const updateCategoryService = async (id, data) => {
    const response = await axios.put(`${PREFIX_URL}${id}/`, data);
    return response;
};

export const deleteCategoryService = async (id) => {
    const response = await axios.delete(`${PREFIX_URL}${id}/`);
    return response;
};