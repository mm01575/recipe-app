import axios from "axios";

export default axios.create({
    baseURL : "http://10.77.60.243:8080/COM3014_CW_Group10/api",
    responseType : "json"
})