<template>
  <div class="wrapper">
    <h2 class="h2 text-warning">배송 완료 건은 자동으로 삭제됩니다.</h2>
    <ParcelNotificationList :notifications="notifications"/>
    <ParcelCreation/>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex';
import ParcelCreation from "@/views/ParcelCreation.vue";
import ParcelNotificationList from "@/views/ParcelNotificationList.vue";

export default {
  components: {
    ParcelNotificationList,
    ParcelCreation
  },
  computed: {
    ...mapGetters('userStore', ['userInfo']),
    ...mapState('parcelStore', ['notifications'])
  }
}
</script>

<style scoped>
.wrapper {
  padding: 10px;
}
</style>