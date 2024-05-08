// src/api文件夹：放ajax相关操作的代码文件,封装的axios请求拦截，相应拦截，接口

// 在 Axios 中，拦截器是一种功能强大的机制，它允许你在发送请求或接收响应之前对它们进行拦截和处理。
// 可以使用拦截器来在请求或响应发出前后进行一些全局的操作，例如添加公共的请求头、拦截错误、身份验证等。
// Axios 提供了两种类型的拦截器：请求拦截器和响应拦截器。
// 请求拦截器（Request Interceptor）允许你在发送请求之前对请求进行修改或添加自定义逻辑。

import axios from "axios";
import Element from 'element-ui'
import router from "../router";
import store from "@/store";
// import store from "@/store/index"

// axios.defaults.baseURL 用于设置请求的基本地址, 基本地址是指在发送请求时会自动添加在请求 URL 前面的部分。
axios.defaults.baseURL = "http://localhost:8083"

// axios.create方法允许你创建一个自定义配置的 Axios 实例，包括请求头、默认的请求参数、拦截器等。
const request = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})

request.interceptors.request.use(config => {
    if(store.state.token){
        config.headers['Authorization'] = localStorage.getItem("token") // 请求头带上token
    }
    return config
})

request.interceptors.response.use(
    // response 参数表示成功的响应对象。当从服务器接收到响应时，该回调函数会被调用，并且可以通过 response 对象来访问响应的数据、状态码、响应头等信息。
    response => {
        let res = response.data;
        console.log("response")
        console.log(res)
        if (res.code === 200) {
            return response
        } else {
            // 服务器返回的响应数据中的 code 字段值不等于 200，这表示业务逻辑上的失败。虽然 HTTP 状态码是成功的（如 2xx 系列），但业务上并不表示成功，需要进一步处理错误。
            // 这和error方法的调用产生了区别
            Element.Message.error(res.msg? res.msg : '系统异常！')
            console.log(Promise.reject(response.data.msg))
            return Promise.reject(response.data.msg)
        }
    },
    // error 参数表示请求错误。当发生网络错误、服务器返回错误状态码或者响应拦截器中抛出错误时，该回调函数会被调用。
    error => {
        console.log(error)
        if(error.response.data) {
            error.message = error.response.data.msg
        }
        if(error.response.status === 401) {
            router.push("/login")

        }
        Element.Message.error(error.message, {duration: 3 * 1000})
        return Promise.reject(error)
    }
)

export default request