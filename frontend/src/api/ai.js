import axios from './axios';

export const sendMessage = (message, history) =>
  axios.post('/ai/chat', { message, history });

  export const generateGraph = (canvasMaxY = 0) => 
  axios.post('/ai/generate-graph', { canvasMaxY });

export const getChatHistory = () =>
  axios.get('/ai/history');

export const clearChatHistory = () =>
  axios.delete('/ai/history');
