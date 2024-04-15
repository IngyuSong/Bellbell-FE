import fortuneAPI from "@/service/fortuneAPI.js";

const state = {
  notification: []
};

const mutations = {
  setNotification(state, notification) {
    state.notification = notification;
  }
};

const actions = {
  async getFortuneNotification({commit}) {
    try {
      const notification = await fortuneAPI.getFortuneNotification();
      commit('setNotification', notification.data);
    } catch (error) {
      console.error('알림을 불러오는 데 실패했습니다:', error);
      throw error;
    }
  },
  async activateFortuneNotification({commit, dispatch}, notification) {
    try {
      await fortuneAPI.activateFortuneNotification(notification);
      console.log('알림이 활성화/비활성화 되었습니다.');
      await dispatch('getFortuneNotification');
    } catch (error) {
      console.error('알림 활성화/비활성화에 실패했습니다:', error);
      throw error;
    }
  }
};


export default {
  namespaced: true,
  state,
  mutations,
  actions
};
