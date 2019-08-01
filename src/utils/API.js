// utils/API.js
import axios from "axios";

export default axios.create({
    baseURL: "https://dev.farmstock.in/api/v1/posts",
    responseType: "json"
});