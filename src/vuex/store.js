import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 初始值
const state = {
    placeset:{
        startplace:'您从哪上车',
        endplace:'您要去哪儿'
    },
    fromlocation: [104.056301,30.537902],
    tolocation:[],
    token: '',
    companyuser : ''
}

// 定义所需的 mutations
const mutations = {
    login(state,access_token){
       state.token=access_token;
    },
    getuser(state,companyuser){
      state.companyuser=companyuser;
    },
    changefromlocation(state,location){
      state.fromlocation=location;
    },
    changetolocation(state,location){
        state.tolocation=location;
      },
    changefrom(state,from){
      state.placeset.startplace=from;
    },
    changeto(state,to){
        state.placeset.endplace=to;
      }
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})