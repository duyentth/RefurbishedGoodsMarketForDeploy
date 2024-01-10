import axios from "axios";
//axios.defaults.baseURL = "http://localhost:3000";
export const axiosInstance = axios.create({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});
