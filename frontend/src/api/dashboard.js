import axios from "./axios";

export const getStats = () => axios.get("/dashboard/stats");