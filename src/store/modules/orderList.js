const state = {
    // 存放数据
    orderList:[],
    params:{}
}
const getters = {
    //调用state
    // orderList:function(state){
    //     return state.orderList
    // }
    // orderList函数可用es6简写为：orderList:state =>state.orderList
    getOrderList:state =>state.orderList

}
const actions = {
    // 异步
    // 通过API请求orderList
    // fetchOrderList函数包含了一个功能对象
    fetchOrderList ({commit,state}){
        Vue.http.post('http://localhost:8080/static/db.json',state.params)
        .then((res)=>{
            commit('updateOrderList',res.data.orderList.list)
            // state.orderList=res.data.orderList.list
            // state.total=res.data.toral
        },(err)=>{

        })
    }

}
const mutations = {
    // 同步
    updateOrderList (state,payload){
        state.orderList=payload     //将数据传进来
    },
    updateParams(state,{key,val}){
        state.params[key]=val
        console.log(state.params)
    }

}


export default {
  state,
  getters,
  actions,
  mutations
}
