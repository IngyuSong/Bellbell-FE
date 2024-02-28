const state = {
  isHeaderVisible: true, // 헤더의 기본 가시성 상태는 true로 설정합니다.
};

const mutations = {
  // 헤더의 가시성 상태를 변경하는 뮤테이션을 정의합니다.
  setHeaderVisibility(state, isVisible) {
    state.isHeaderVisible = isVisible;
  },
};

const actions = {
  // 헤더의 가시성 상태를 변경하는 액션을 정의합니다.
  updateHeaderVisibility({commit}, isVisible) {
    commit('setHeaderVisibility', isVisible);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}