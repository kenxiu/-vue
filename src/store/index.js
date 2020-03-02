import Vuex from 'vuex'
import Vue from 'vue'
import orderList from './modules/orderList'
Vue.use(Vuex)

// 实例化vuex数据仓库
export default new Vuex.Store({
    modules:{
        orderList
    }
})