import axios from "axios";

const api = axios.create({
  baseURL: "https://viacep.com.br/ws/",
  headers: [
    { "Access-Control-Allow-Origin": "*" },
    {
      "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    },
    {
      "Access-Control-Allow-Headers":
        "content-type, authorization, x-requested-with",
    },
  ],
});

export default api;
