import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:8032/api/v1/",

  baseURL: "https://admin.queenbella.mn/api/",
});

instance.defaults.withCredentials = true;

export default instance;
