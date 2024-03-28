<template>
  <div class="wrapper">
    <UserNotificationList :notifications="notifications"/>
    <NotificationCreation/>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex';
import NotificationCreation from '@/views/NotificationCreation.vue';
import UserNotificationList from "@/views/UserNotificationList.vue";

export default {
  components: {
    UserNotificationList,
    NotificationCreation
  },
  computed: {
    ...mapGetters('userStore', ['userInfo']),
    ...mapState('notificationStore', ['notifications'])
  }
}
</script>

<style scoped>
.wrapper {
  padding: 10px;
}
</style>