import axios from "axios";

export default {
  async kakaoLogin(code) {
    try {
      const response = await axios.get(
          `${import.meta.env.VITE_APP_SERVER_API_URI}/login?code=${code}`, {
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            },
          });
      console.log(response);

      return response.data; // 서버에서 받은 데이터를 반환
    } catch (error) {
      throw new Error('로그인 요청에 실패하였습니다.');
    }
  }
};