import axios from './axios';

export const getGraph = () => axios.get('/graph');
export const createNode = (data) => axios.post('/graph/nodes', data);
export const createEdge = (data) => axios.post('/graph/edges', data);
export const updateNode = (id, data) => axios.put(`/graph/nodes/${id}`, data);
export const deleteNode = (id) => axios.delete(`/graph/nodes/${id}`);
export const deleteEdge = (id) => axios.delete(`/graph/edges/${id}`);
export const updateNodePosition = (id, x, y) =>
  axios.patch(`/graph/nodes/${id}/position`, { x, y });