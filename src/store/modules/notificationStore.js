import notificationAPI from '@/service/notificationAPI.js';

const state = {
  notifications: []
};

const mutations = {
  setNotifications(state, notifications) {
    state.notifications = notifications;
  }
};

const actions = {
  async fetchNotifications({commit}) {
    try {
      const notifications = await notificationAPI.fetchNotifications();
      commit('setNotifications', notifications.data);
    } catch (error) {
      console.error('알림 목록을 불러오는 데 실패했습니다:', error);
      throw error;
    }
  },
  async createNotification({commit, dispatch}, notification) {
    try {
      await notificationAPI.createNotification(notification);
      console.log('알림이 생성되었습니다.');
      commit('modalStore/setShowModal', false, {root: true}); // 모달 닫기
      await dispatch('fetchNotifications');
    } catch (error) {
      console.error('알림 생성에 실패했습니다:', error);
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