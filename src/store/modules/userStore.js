import loginAPI from "@/service/loginAPI.js";

const state = {
  userInfo: null,
};

const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  },
};

const actions = {
  async login({ commit }, code) {
    try {
      const userInfo = await loginAPI.kakaoLogin(code);
      console.log(userInfo);
      commit('setUserInfo', userInfo.data);
    } catch (error) {
      console.error(error);
      // 에러 처리 로직 추가
    }
  },
  // 애플리케이션 시작 시 로컬 스토리지에서 상태를 복원하는 액션
  restoreStateFromLocalStorage({ commit }) {
    const userInfoStr = localStorage.getItem('userInfo');
    if (userInfoStr) {
      const userInfo = JSON.parse(userInfoStr);
      commit('setUserInfo', userInfo);
    }
  }
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
  actions,
  getters
};