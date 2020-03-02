<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!-- 对应的组件内容渲染到router-view中 -->
        <router-view></router-view>
    <router-link to="/apple">to apple</router-link>
    <router-link :to="{path:'/banana'}">to banana</router-link>
    {{totalPrice}}
    <apple></apple>
    <banana></banana>
  </div>
</template>

<script>
import Apple from './components/apple'
import Banana from './components/banana'
export default {
  name: 'App',
  date () {

  },
  components:{Apple,Banana},
  computed:{
    totalPrice () {
      return this.$store.state.totalPrice
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
