import axios from 'axios';

export default {
  async fetchNotifications() {
    try {
      const response = await axios.get(
          `${import.meta.env.VITE_APP_SERVER_API_URI}/notifications`,
          {
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            }
          }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('알림 목록을 불러오는 데 실패했습니다:', error);
      throw error;
    }
  },

  async createNotification(notification) {
    try {
      return await axios.post(
          `${import.meta.env.VITE_APP_SERVER_API_URI}/notifications/create`,
          notification,
          {
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
          }
      );
    } catch (error) {
      console.error('알림 생성에 실패했습니다:', error);
      throw error;
    }
  },

  async deleteNotification(notificationId) {
    try {
      return await axios.delete(
          `${import.meta.env.VITE_APP_SERVER_API_URI}/notifications/delete/${notificationId}`,
          {
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
          }
      );
    } catch (error) {
      console.error('알림 삭제에 실패했습니다:', error);
      throw error;
    }
  }
}
