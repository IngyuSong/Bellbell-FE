<template>
  <div class="wrapper">
    <div class="logo">
      <img alt="logo" src="@/assets/bellbell.png">
      <div class="logo letter">
        벨 벨
      </div>
    </div>
    <div class="btn">
      <img src="@/assets/kakao_login_medium_narrow.png" alt="카카오 로그인" @click="loginWithKakao">
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    loginWithKakao() {
      window.location.href = import.meta.env.VITE_APP_KAKAO_AUTHORIZATION_URI;
    }
  }
}
</script>

<style scoped>
.wrapper {
  margin: 10% 10% 0 10%;
  display: block;
  background: beige;
  padding-bottom: 10%;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.logo {
  img {
    margin-top: 10%;
    width: 150px;
    height: 100px;
  }

  color: orange;
  font-size: 20px;
  font-weight: bold;
}

.btn {
  margin-top: 20%;

  img {
    cursor: pointer;
  }
}
</style>