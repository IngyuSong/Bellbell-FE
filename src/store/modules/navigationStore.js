const state = {
  currentTab: 'NotificationList'
};

const mutations = {
  setCurrentTab(state, tabName) {
    state.currentTab = tabName;
  }
};

const actions = {
  changeTab({commit}, tabName) {
    commit('setCurrentTab', tabName);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};