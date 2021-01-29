<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <!-- <a-locale-provider :locale="locale" id="app"> -->
    <router-view/>
    <!-- </a-locale-provider> -->
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script lang="ts">
// import { LocaleProvider } from 'ant-design-vue'
// import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { Component, Vue } from 'vue-property-decorator'
// @Component({
//   components: {
//     'a-locale-provider': LocaleProvider
//   }
// })
// export default class App extends Vue {
//   locale:any = zhCN
// }
</script>