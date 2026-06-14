import axios from "./axios";

export const getBugs = () => axios.get('/bugs');
export const createBug = (data) => axios.post('/bugs', data);
export const updateBug = (id, data) => axios.put(`/bugs/${id}`, data);
export const deleteBug = (id) => axios.delete(`/bugs/${id}`);