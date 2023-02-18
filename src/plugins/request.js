import axios from 'axios'
import qs from 'qs'
//创建新的axios实例
const service = axios.create({
    baseURL: '',//公共接口
    timeout: 3000,//超时时间
})
//请求拦截器
service.interceptors.request.use(config => {
    //发送请求前做一些处理，例如配置请求头，数据转化，设置token，
    config.data = JSON.stringify(config.data);//数据转化，可以使用qs转化
    config.headers = {
        'Content-Type': 'application/json'  //配置请求头
    }
    //使用token的时候要引入cookie的方法或者使用localStorage等方法，推荐js-cookie
    
    // const token = getCookie('名称')//先拿token存储
    // if(token){
    //     config.params = {'token': token},//如果要求携带在参数中
    //     config.headers.token = token//如果要求携带在请求头中
    // }
    
    return config //将配置完成的config对象返回出去，如果不返回请求则不会进行
},err => {
    Promise.reject(err)
})
//响应拦截器
service.interceptors.response.use(response => {
    //接收到响应数据并成功后的一些共有处理，如关闭loading
    return response
}, err => {
    //接收到异常响应的处理
    if(err&&err.response){
        //1.公共错误处理
        //2.根据响应码具体处理
        switch(err.response.status){
            case 400: 
                err.message = '错误请求'
                break;
            case 404:
                err.message = '请求错误，未找到该资源'
                break;
            case 500: 
                err.message = '服务器错误'
                break;
            case 505:
                err.message = 'http版本不支持该请求'
                break;
            default:
                err.message = '请求出错'
        }
    }else {
        if(JSON.stringify(err).includes('timeout')){
            console.log('服务器请求超时，请刷新页面')//可以弹窗显示或者引入elementui做消息处理
        }
        console.log('连接服务器失败')
        return Promise.resolve(err.response)
    }
})
export default service