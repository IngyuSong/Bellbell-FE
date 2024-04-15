import axios from 'axios';

export default {
  async getFortuneNotification() {
    try {
      const response = await axios.get(
          `${import.meta.env.VITE_APP_SERVER_API_URI}/fortune`,
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
      console.error('운세 알림을 불러오는 데 실패했습니다:', error);
      throw error;
    }
  },

  async activateFortuneNotification(notification) {
    try {
      const response= await axios.post(
          `${import.meta.env.VITE_APP_SERVER_API_URI}/fortune`,
          notification,
          {
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
          }
      );
      console.log(response.data);
    } catch (error) {
      console.error('운세 알림 활성화/비활성화에 실패했습니다:', error);
      alert('알림 활성화/비활성화 실패!');
      location.reload();
      throw error;
    }
  }
}
