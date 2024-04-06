import lunchAPI from "@/service/lunchAPI.js";

const state = {
  notification: []
};

const mutations = {
  setNotification(state, notification) {
    state.notification = notification;
  }
};

const actions = {
  async getLunchNotification({commit}) {
    try {
      const notification = await lunchAPI.getLunchNotification();
      commit('setNotification', notification.data);
    } catch (error) {
      console.error('알림을 불러오는 데 실패했습니다:', error);
      throw error;
    }
  },
  async activateLunchNotification({commit, dispatch}, notification) {
    try {
      await lunchAPI.activateLunchNotification(notification);
      console.log('알림이 활성화/비활성화 되었습니다.');
      await dispatch('getLunchNotification');
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
