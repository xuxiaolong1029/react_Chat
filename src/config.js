import axios from 'axios'
import cookies from 'browser-cookies';
import { Toast }from 'antd-mobile';
axios.defaults.timeout = 100000;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8"; //配置请求头信息。
//拦截请求
axios.interceptors.request.use(function(config){
    Toast.loading('加载中',0)
    config.headers.common.Authorization = cookies.get('token');
    return config
},err=>{
    return Promise.reject(err);
})
//响应拦截
axios.interceptors.response.use(function(response){
    Toast.hide();
    return response
},error=>{
    if (error.response) {
        switch (error.response.status) {
          case 400:
            Toast.fail("400 Bad Request")
            break;
          case 401:
            localStorage.removeItem('token');
            break;
          case 404:
            Toast.fail("404");
            break;
          case 500:
            Toast.fail("服务器异常，请稍后再试")
            break;
          default:
            break;
        }
        return Promise.reject(error.response.data);
      }else{
        return Promise.reject(error);
      }
})
