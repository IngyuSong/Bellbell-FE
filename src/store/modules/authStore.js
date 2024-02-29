import loginAPI from "@/service/loginAPI.js";

const state = {
  accessToken: null,
};

const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken;
    sessionStorage.setItem('accessToken', accessToken);
  },
};

const actions = {
  async login({commit}, code) {
    try {
      const accessToken = await loginAPI.kakaoLogin(code);
      commit('setAccessToken', accessToken.data);
    } catch (error) {
      console.error(error);
    }
  },
  // 애플리케이션 시작 시 세션 스토리지에서 상태를 복원하는 액션
  restoreStateFromLocalStorage({commit}) {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      commit('setAccessToken', accessToken);
    }
  }
};

const getters = {
  accessToken(state) {
    return state.accessToken;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};