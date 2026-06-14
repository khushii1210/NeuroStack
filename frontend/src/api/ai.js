import axios from './axios';

export const sendMessage = (message, history) =>
  axios.post('/ai/chat', { message, history });

export const generateGraph = () =>
  axios.get('/ai/generate-graph');

export const getChatHistory = () =>
  axios.get('/ai/history');

export const clearChatHistory = () =>
  axios.delete('/ai/history');
