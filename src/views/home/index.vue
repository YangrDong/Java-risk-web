<template>
  <el-container>
    <el-aside width="200px">
      <NavMenu></NavMenu>
    </el-aside>
    <el-container>
      <el-header>
        <strong style="color: white;">公司风险诊断可视化系统</strong>
        <div class="header-avatar">
          <el-avatar :src="userInfo.avatar"></el-avatar>
          <el-dropdown>
            <span class="el-dropdown-link" style="color: white;">
              {{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link to="/userCenter">
                  个人中心
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item @click.native="logout">
                退出
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <Tabs></Tabs>
      </el-header>
      <el-main style="overflow: hidden;">
        <div>
          <keep-alive>
            <router-view v-if="($route.meta.isAlive)"></router-view>
          </keep-alive>
          <router-view v-if="!($route.meta.isAlive)"></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavMenu from '../inc/SideMenu.vue'
import Tabs from '../inc/Tabs.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    NavMenu, Tabs
  },
  data() {
    return {
      userInfo: {
        id : '',
        username: '',
        avatar: '',
      },

    }
  },
  methods: {
    getUserInfo() {
      this.$axios.get("/sys/userInfo").then(res => {
        this.userInfo = res.data.data
        console.log('调用用户信息')
      })
    },
    logout() {
      this.$axios.post("/logout").then(res => {
        localStorage.clear()
        sessionStorage.clear()

        this.$store.commit("resetState")
        this.$router.push("/login")
      })
    }
  },
  created() {
    this.getUserInfo()
  }
}
</script>

<style>
.header-avatar {
  float: right;
  display: flex;
  align-items: center;
  width: 150px;
  justify-content: space-around;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-container {
  height: 100vh;
  padding: 0;
  margin: 0;
}

.el-header {
  background-color: #336699;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0px !important;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  line-height: 200px;
}

.el-main {
  color: #333;
  padding-left: 0px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

a {
  text-decoration: none;
}
</style>
