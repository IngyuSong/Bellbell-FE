const state = {
  userInfo: null,
};

const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
};

const getters = {
  userInfo(state) {
    return state.userInfo;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
};