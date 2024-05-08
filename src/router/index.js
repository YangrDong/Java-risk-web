import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'
import Index from '../views/Index.vue'
import Show from '../views/show/ShowMess.vue'
import Action from '../views/action/Actions.vue'
import Login from '../views/login/index.vue'
import UserCenter from '../views/usercenter/index.vue'
import Report from "../views/report/report.vue";
import store from "@/store";
import singleReport from "@/views/report/singleReport.vue";
// import axios from "../api/axios"
// import store from "../store"

Vue.use(VueRouter)

const routes = [

    {
        path: '/',
        name: 'Home',
        component: Home,
        redirect:'/index',
        children: [
            {
                path: '/userCenter',
                name: 'UserCenter',
                meta: {
                    title: "个人中心",
                    isAlive:true
                },
                component: UserCenter
            },
            {
                path: '/index',
                name: 'Index',
                meta: {
                    title: "首页",
                    isAlive:true
                },
                component: Index

            },
            {
                path: '/show',
                name: 'Show',
                meta: {
                    title: "风险指标一览",
                    isAlive:true
                },
                component: Show
            },
            {
                path: '/action',
                name: 'Action',
                meta: {
                    title: "风险指标诊断",
                    isAlive:true
                },
                component: Action
            },
            {
                path:'/report',
                name:'Report',
                meta: {
                  title: "风险评估报告",
                    isAlive:false
                },
                component: Report,

            },
            {
                path: '/singleReport',
                name: 'SingleReport',
                meta: {
                    title: "风险报告详情",
                    isAlive:false
                },
                component: singleReport,
            }

        ]
    },
    {
        path: '/login',
        name: 'Login',
        component:Login
    }
    
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// 动态绑定路由, 每一次路由跳转之前获取用户可以看到的菜单, 同时限制用户可以跳转的路由
router.beforeEach((to, from, next) => {

    let hasRoute = store.state.menus.hasRoutes;

    let token = store.state.token ? store.state.token : window.localStorage.getItem("token");

    if (to.path === "/login") {
        next()
    } else if (!token) {
        next({path: '/login'})
    } else if (token && !hasRoute) {
        hasRoute = true
        store.commit("changeRouteStatus", hasRoute)

    }
    // next()函数一定要写， 不然页面跳转不过去...找了好久...
    next()
})




export default router