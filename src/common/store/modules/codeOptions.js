const codeOptions = {
  state: {
    options:{}
  },
  mutations: {
    SET_OPTIONS: (state, res) => {
      state.options = res
    },
  },
  actions: {
    SetOptions({ commit }, data){
      commit('SET_OPTIONS', data)
    }
  }
}
export default codeOptions
