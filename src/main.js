import Vue from 'vue'
import Layout from './components/layout'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import IndexPage from './pages/index'
import DetailPage from './pages/detail'
import OrderListPage from './pages/orderList'
import Element from 'element-ui'
import DetailAnaPage from './pages/detail/analysis'
import DetailCouPage from './pages/detail/count'
import DetailForPage from './pages/detail/forecast'
import DetailPubPage from './pages/detail/publish'
import store from './store'
Vue.use(Element)
Vue.use(VueRouter)
Vue.use(VueResource)
let router=new VueRouter({
  // mode: 'history',
  routes: [
    {
      path:'/',
      component:IndexPage
    },
    {
      path:'/orderList',
      component:OrderListPage
    },
    {
      path:'/detail',
      component:DetailPage,
      redirect:'/detail/analysis',
      children:[
        {
          path:'analysis',
          component:DetailAnaPage
        },
        {
          path:'count',
          component:DetailCouPage
        },
        {
          path:'forecast',
          component:DetailForPage
        },
        {
          path:'publish',
          component:DetailPubPage
        }
      ]
    }
  ]
})
new Vue({
  el: '#app',
  router,        //router:router,的简写；写入vue根实例的配置项中；管理路由，到routes中查找对应内容
  store,
  components: { Layout },
  template: '<Layout/>'
})
