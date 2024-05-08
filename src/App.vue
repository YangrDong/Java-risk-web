<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',

  // 当通过url直接访问管理界面时，导航页面也要有访问的页面项
  watch: {
    $route(to, from) {
      if (to.path != '/login') {
        console.log("to")
        console.log(to)

        let obj = {
          name: to.name,
          title: to.meta.title
        }

        this.$store.commit("addTab", obj)
      }
    }
  }
}
</script>

<style>
html, body, #app {
  height:100vh;
  padding: 0;
  margin: 0;
  font-size: 15px;
}
</style>
