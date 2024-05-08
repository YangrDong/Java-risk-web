import Vuex from 'vuex'
import Vue from 'vue'


Vue.use(Vuex)

const state = {
    menuList: [],
    permList: [],

    hasRoutes: false,

    //激活的标签页导航
    editableTabsValue: 'Index',
    //标签页导航
    editableTabs: [{
        title: '首页',
        name: 'Index',
    }]
}

//示意mutation
const mutations = {
    setMenuList(state, menus) {
        state.menuList = menus
    },
    setPermList(state, perms) {
        state.permList = perms
    },

    changeRouteStatus(state, hasRoute) {
        state.hasRoutes = hasRoute
        // sessionStorage.setItem("hasRoute", hasRoute)
    },

    addTab(state, tab) {
        let index = state.editableTabs.findIndex(e => e.name === tab.name)

        if (index === -1) {
            state.editableTabs.push({
                title: tab.title,
                name: tab.name,
            });
        }

        state.editableTabsValue = tab.name;
    },

    // 退出时要将Vuex中保存的所有的状态清空
    resetState: (state) => {
        state.menuList = []
        state.permList = []

        state.hasRoutes = false

        state.menuList = ''
        state.editableTabsValue = 'Index'
        state.editableTabs = [{
            title: '首页',
            name: 'Index',
        }]
    }
}

const actions = {

}

// 创建store
const store = ({
    actions,
    mutations,
    state
})

export default store
