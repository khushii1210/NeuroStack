import axios from './axios';

export const getSnippets = () => axios.get('/snippets');
export const createSnippet = (data) => axios.post('/snippets', data);
export const updateSnippet = (id, data) => axios.put(`/snippets/${id}`, data);
export const deleteSnippet = (id) => axios.delete(`/snippets/${id}`);