import axios from "axios";

const instance = axios.create({
    baseURL: process.env.VUE_APP_API,
    //timeout: 20000 // timeout 20초 설정
});

export default instance