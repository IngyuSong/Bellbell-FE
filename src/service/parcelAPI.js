import axios from "axios";

export default {
  async getCarriers() {
    try {
      const response = await axios.get(
          `https://apis.tracker.delivery/carriers`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error getCarriers:', error);
    }
  },

  async fetchNotifications() {
    try {
      const response = await axios.get(
          `${import.meta.env.VITE_APP_SERVER_API_URI}/parcel`,
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
      console.error('택배 알림 목록을 불러오는 데 실패했습니다:', error);
      throw error;
    }
  },

  async createNotification(notification) {
    try {
      return await axios.post(
          `${import.meta.env.VITE_APP_SERVER_API_URI}/parcel/create`,
          notification,
          {
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
          }
      );
    } catch (error) {
      console.error('택배 알림 생성에 실패했습니다:', error);
      throw error;
    }
  },

  async deleteNotification(parcelId) {
    try {
      return await axios.delete(
          `${import.meta.env.VITE_APP_SERVER_API_URI}/parcel/delete/${parcelId}`,
          {
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
          }
      );
    } catch (error) {
      console.error('택배 알림 삭제에 실패했습니다:', error);
      throw error;
    }
  }

}