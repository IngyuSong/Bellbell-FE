<template>
  <div class="wrapper">
    <div v-if="userInfo !== null">
      <h3>{{ userInfo.data.nickname }} 님의 알림</h3>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
    <Navigation/>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex';
import userInfoAPI from "@/service/userInfoAPI.js";
import {store} from "@/store/index.js";
import NotificationList from '@/views/UserNotificationList.vue';
import NotificationCreation from '@/views/NotificationCreation.vue';
import Navigation from "@/views/Navigation.vue";

export default {
  components: {
    Navigation,
    NotificationList,
    NotificationCreation
  },
  computed: {
    ...mapGetters('userStore', ['userInfo']),
    ...mapState('notificationStore', ['notifications'])
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