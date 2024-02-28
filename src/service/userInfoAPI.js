import axios from "axios";

export default {
  async fetchUserInfo() {
    const token = sessionStorage.getItem('accessToken');
    if (!token) {
      // 토큰이 없으면 로그인 페이지로 이동
      return null;
    }

    try {
      const response = await axios.get(
          `${import.meta.env.VITE_APP_SERVER_API_URI}/member`,
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              "Authorization": `${token}`
            }
          });
      return response.data;
    } catch (error) {
      console.error('Error fetching user info:', error);
      return null;
    }
  }

}