const Mock = require('mockjs')

const Random = Mock.Random

let Result = {
    code: 200,
    msg: '操作成功',
    data: null
}

// Mock.mock()方法来进行数据模拟和接口请求的模拟。
// Mock.mock()方法接受三个参数：
//
// url（字符串或正则表达式）：表示要拦截的请求地址，可以是具体的URL或包含通配符的正则表达式。
// type（字符串或函数）：表示请求类型，可以是HTTP请求方法（GET、POST、PUT、DELETE等），也可以是自定义的请求类型。
// template（函数或对象）：表示请求响应的模板，可以是一个函数或一个对象。如果是对象，则为响应的固定数据。如果是函数，则可以通过该函数生成响应数据。

Mock.mock('/captcha','get', () => {
    Result.data = {
        token: Random.string(32),
        captcha: Random.dataImage('100x40', 'p7n5w')
    }
    return Result
})

Mock.mock('/login', 'post', () => {

    // 使用异常的返回来测试axios拦截器效果
    // Result.code = 400
    // Result.msg = '验证码错误'

    return Result
})

Mock.mock('/sys/userInfo', 'get', () => {

    Result.data = {
        id: '1',
        username: 'peter',
        avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F1a2ebf1a-fcfc-4f76-a21d-b736421f79b4%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1693274765&t=3f232492b45b76cd352701cbb657d2ed'
    }
    return Result
})

Mock.mock('/logout', 'post', () => {


    return Result
})

Mock.mock('sys/menu/show', 'get', () => {
    let show = []
    let authoritys = []

    Result.data = {
        show: show,
        authoritys: authoritys
    }

    return Result
})

// Mock.mock('/sys/menu/action', 'get', () => {
//     var myDate = new Date();//获取系统当前时间
//     var mytime=myDate.toLocaleTimeString(); //获取当前时间
//     let actions = []

//     Result.data = actions

//     return Result
// })

// Mock.mock(RegExp('/sys/menu/info/*'), 'get', () => {

//     Result.data = {
//         "id": 3,
//         "statu": 1,
//         "parentId": 1,
//         "name": "角色管理",
//         "path": "/sys/roles",
//         "perms": "sys:role:list",
//         "component": "sys/Role",
//         "type": 1,
//         "icon": "el-icon-rank",
//         "orderNum": 2,
//         "children": []
//     }

//     return Result
// })

// Mock.mock(RegExp('/sys/menu/*'), 'post', () => {

//     return Result
// })

//////////////// 角色管理 ////////////////

// Mock.mock(RegExp('/sys/role/list*'), 'get', () => {

//     Result.data = {
//         "records": [
//             {
//                 "id": 3,
//                 "created": "2021-01-04T10:09:14",
//                 "updated": "2021-01-30T08:19:52",
//                 "statu": 1,
//                 "name": "普通用户",
//                 "code": "normal",
//                 "remark": "只有基本查看功能",
//                 "menuIds": []
//             },
//             {
//                 "id": 6,
//                 "created": "2021-01-16T13:29:03",
//                 "updated": "2021-01-17T15:50:45",
//                 "statu": 1,
//                 "name": "超级管理员",
//                 "code": "admin",
//                 "remark": "系统默认最高权限，不可以编辑和任意修改",
//                 "menuIds": []
//             }
//         ],
//         "total": 2,
//         "size": 10,
//         "current": 1,
//         "orders": [],
//         "optimizeCountSql": true,
//         "hitCount": false,
//         "countId": null,
//         "maxLimit": null,
//         "searchCount": true,
//         "pages": 1
//     }

//     return Result

// })

// Mock.mock(RegExp('/sys/role/info/*'), 'get', () => {

//     Result.data = {
//         "id": 6,
//         "created": "2021-01-16T13:29:03",
//         "updated": "2021-01-17T15:50:45",
//         "statu": 1,
//         "name": "超级管理员",
//         "code": "admin",
//         "remark": "系统默认最高权限，不可以编辑和任意修改",
//         "menuIds": [5, 6]
//     }

//     return Result
// })

// Mock.mock(RegExp('/sys/role/*'), 'post', () => {

//     return Result
// })

//////////////// 用户管理 ////////////////

// Mock.mock(RegExp('/sys/user/list*'), 'get', () => {
//     Result.data = {
//         "records": [
//             {
//                 "id": 1,
//                 "created": "2021-01-12T22:13:53",
//                 "updated": "2021-01-16T16:57:32",
//                 "statu": 1,
//                 "username": "admin",
//                 "password": "$2a$10$R7zegeWzOXPw871CmNuJ6upC0v8D373GuLuTw8jn6NET4BkPRZfgK",
//                 "avatar": "https://image-1300566513.cos.ap-guangzhou.myqcloud.com/upload/images/5a9f48118166308daba8b6da7e466aab.jpg",
//                 "email": "123@qq.com",
//                 "city": "广州",
//                 "lastLogin": "2020-12-30T08:38:37",
//                 "roles": [
//                     {
//                         "id": 6,
//                         "created": "2021-01-16T13:29:03",
//                         "updated": "2021-01-17T15:50:45",
//                         "statu": 1,
//                         "name": "超级管理员",
//                         "code": "admin",
//                         "remark": "系统默认最高权限，不可以编辑和任意修改",
//                         "menuIds": []
//                     },
//                     {
//                         "id": 3,
//                         "created": "2021-01-04T10:09:14",
//                         "updated": "2021-01-30T08:19:52",
//                         "statu": 1,
//                         "name": "普通用户",
//                         "code": "normal",
//                         "remark": "只有基本查看功能",
//                         "menuIds": []
//                     }
//                 ]
//             },
//             {
//                 "id": 2,
//                 "created": "2021-01-30T08:20:22",
//                 "updated": "2021-01-30T08:55:57",
//                 "statu": 1,
//                 "username": "test",
//                 "password": "$2a$10$0ilP4ZD1kLugYwLCs4pmb.ZT9cFqzOZTNaMiHxrBnVIQUGUwEvBIO",
//                 "avatar": "https://image-1300566513.cos.ap-guangzhou.myqcloud.com/upload/images/5a9f48118166308daba8b6da7e466aab.jpg",
//                 "email": "test@qq.com",
//                 "city": null,
//                 "lastLogin": null,
//                 "roles": [
//                     {
//                         "id": 3,
//                         "created": "2021-01-04T10:09:14",
//                         "updated": "2021-01-30T08:19:52",
//                         "statu": 1,
//                         "name": "普通用户",
//                         "code": "normal",
//                         "remark": "只有基本查看功能",
//                         "menuIds": []
//                     }
//                 ]
//             }
//         ],
//         "total": 2,
//         "size": 10,
//         "current": 1,
//         "orders": [],
//         "optimizeCountSql": true,
//         "hitCount": false,
//         "countId": null,
//         "maxLimit": null,
//         "searchCount": true,
//         "pages": 1
//     }

//     return Result
// })

// Mock.mock(RegExp('/sys/user/*'), 'post', () => {
//     return Result
// })

Mock.mock(RegExp('/sys/user/info/*'), 'get', () => {

    Result.data = {
        "id": 2,
        "created": "2021-01-30T08:20:22",
        "updated": "2021-01-30T08:55:57",
        "statu": 1,
        "username": "test",
        "password": "$2a$10$0ilP4ZD1kLugYwLCs4pmb.ZT9cFqzOZTNaMiHxrBnVIQUGUwEvBIO",
        "avatar": "https://image-1300566513.cos.ap-guangzhou.myqcloud.com/upload/images/5a9f48118166308daba8b6da7e466aab.jpg",
        "email": "test@qq.com",
        "city": null,
        "lastLogin": null,
        "roles": []
    }
    return Result
})
