<template>
  <div class="wrapper">
    <div v-if="userInfo !== null">
      <h3>{{ userInfo.nickname }} 님의 알림</h3>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('userStore', ['userInfo'])
  }
}
</script>

<style scoped>
.wrapper {
  padding: 10px;
}
</style>