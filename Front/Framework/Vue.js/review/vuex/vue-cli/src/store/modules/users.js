export const user = {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    login({ commit }) {},
    logout({ commit }) {},
  },
  getters: {},
};
