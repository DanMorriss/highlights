import axios from "axios";

axios.defaults.baseURL = "https://drf-highlights-319d26c2d75e.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;