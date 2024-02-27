<template>
  <div class="wrapper">
    <div v-if="userInfo !== null">
      <h3>{{ userInfo.data.nickname }} 님의 알림</h3>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import userInfoAPI from "@/service/userInfoAPI.js";
import {store} from "@/store/index.js";

export default {
  computed: {
    ...mapGetters('userStore', ['userInfo'])
  },
  async mounted() {
    const userInfo = await userInfoAPI.fetchUserInfo();
    if (userInfo) {
      // 사용자 정보가 있으면 스토어에 저장
      store.commit('userStore/setUserInfo', userInfo);
    }
  }
}
</script>

<style scoped>
.wrapper {
  padding: 10px;
}
</style>