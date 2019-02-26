const user = {
  state: {
    user: '',
    token: '',
    userId: '',
    userName: ""
  },
  mutations: {
    SET_TOKEN: (state, user) => {
      state.user = user.user
      state.token = user.token
      state.userId = user.userId
      state.userName = user.userName
    },
  },
  actions: {
  }
}
export default user
