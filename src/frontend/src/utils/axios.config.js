import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000, // Tempo limite das requisições
  headers: {
    "Content-Type": "application/json",
  },
});


export default api;
