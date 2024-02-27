<template>
  <div class="wrapper">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">로딩 중...</span>
    </div>
    <div class="notice">
      <p>로그인 중입니다.</p>
      <p>잠시만 기다려주세요.</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  mounted() {
    const code = new URL(window.location.href).searchParams.get("code");
    this.handleLogin(code);
  },
  methods: {
    ...mapActions('userStore', ['login']),
    async handleLogin(code) {
      try {
        await this.login(code);
        this.$router.push('/');
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    },
  }
}
</script>


<style scoped>
.wrapper {
  background: beige;
  display: block;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 50vh;
  padding: 15vh;
}

.notice p {
  margin-bottom: 10px;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
  margin-bottom: 10px;
}
</style>