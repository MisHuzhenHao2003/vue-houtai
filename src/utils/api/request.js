import axios from 'axios'

const request = axios.create({
    baseURL: 'http://8.130.115.205:8887/api/private/v1/',
    timeout: 50000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 为请求对象，添加Token验证Authorization字段
    config.headers.Authorization = sessionStorage.getItem('TOKEN')
    return config;
}, function (error) {
    //  
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default request