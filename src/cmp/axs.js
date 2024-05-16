
import axios from "axios"; 

export default axios.create({
    method: "POST",
    //baseURL: "http://dwlite",
    responseType: "json",
    timeout: 10000,
});