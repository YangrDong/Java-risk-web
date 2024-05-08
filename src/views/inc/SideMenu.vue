<template>
  <el-menu
      :default-active="this.$store.state.menus.editableTabsValue"
      class="el-menu-vertical-demo"
      background-color="#336699"
      text-color="#fff"
      active-text-color="#99CCFF">

    <router-link to="/index">
      <el-menu-item index="Index" @click="selectMenu({title: '首页', name: 'Index'})">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </template>
      </el-menu-item>
    </router-link>

    <router-link to="/show">
        <el-menu-item index="Show" @click="selectMenu({title:'风险诊断一览',name:'Show'})">
            <template slot="title">
                <i class="el-icon-document"></i>
                <span slot="title">风险诊断一览</span>
            </template>
        </el-menu-item>
    </router-link>

    <router-link to="/action">
        <el-menu-item index="Action" @click="selectMenu({title:'风险诊断评估',name:'Action'})">
            <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">风险诊断评估</span>
            </template>
        </el-menu-item>
    </router-link>

    <router-link to="/report">
      <el-menu-item index="Report" @click="selectMenu({title:'风险评估报告',name:'Report'})">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">风险诊断报告</span>
        </template>
      </el-menu-item>
    </router-link>

  </el-menu>
</template>

<script>
export default {
  name: "SideMenu",
  data() {
    return {

    }
  },
  computed: {   // 计算属性会自动跟踪依赖的变化，当this.$store.state.menus.menuList的值发生变化时，计算属性会重新计算，
    
  },
  
  methods: {
    selectMenu(item) {
      this.$store.commit("addTab", item)
    }
  }
}
</script>


<style scoped>
.el-menu-vertical-demo {
  height: 100vh;
}
</style>