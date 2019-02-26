import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/user'
import codeOptions from './modules/codeOptions'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    User,
    codeOptions
  }
})

export default store
