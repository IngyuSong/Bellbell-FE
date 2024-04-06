<template>
  <div class="wrapper">
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