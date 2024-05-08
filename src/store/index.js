import Vuex from 'vuex'
import Vue from 'vue'
import menus from "./modules/menus"

Vue.use(Vuex)

// Vuex是Vue.js的官方状态管理库，用于对应用程序中的共享状态进行集中管理。

// Vuex的核心概念包括：
// State（状态）：存储应用程序中共享的状态数据。Vuex的状态存储在一个单一的源（single source of truth）中，即store对象。
// Getters（获取器）：用于从store中派生出状态。它们类似于Vue组件中的计算属性，可以根据存储的状态进行计算和获取。Getters可以提供可复用的计算逻辑，也可以对存储的状态进行筛选和转换。
// Mutations（变更）：用于修改store中的状态。它们是唯一能够修改状态的方式。Mutations是同步操作，用于确保状态的可追踪性和可维护性。
// Actions（动作）：用于封装可以包含异步操作的操作序列。Actions通过提交Mutations来间接修改状态。在Actions中可以执行异步逻辑、提交Mutations、调用其他Actions等。
// Modules（模块）：允许将store拆分成多个模块，每个模块拥有自己的状态、获取器、变更和动作。

const state = {
    token: window.localStorage.getItem('token'),
    // token: token
}

// const token = localStorage.getItem("token") ? localStorage.getItem("token") : ""

const mutations = {
    SET_TOKEN: (state, token)  => {
        store.state.token = token
        // 登录之后获取到的jwt就可以存储到应用的store以及localStorage中，方便使用直接从localStorage中获取即可！
        localStorage.setItem('token', token)
    },

}

const actions = {

}

const modules = {
    menus
}

// 创建store
const store = new Vuex.Store({
    actions,
    mutations,
    state,
    modules
})

export default store
