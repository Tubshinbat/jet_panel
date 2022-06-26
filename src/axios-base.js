import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:8000/api/v1/",

  baseURL: "https://jetschool.edu.mn/api/",
});

instance.defaults.withCredentials = true;

export default instance;
