<template>
  <nav>
    <ul>
      <li @click="changeTab('NotificationList')"
          :class="{ active: currentTab === 'NotificationList' }">기본 알림
      </li>
      <li @click="changeTab('ParcelNotification')"
          :class="{ active: currentTab === 'ParcelNotification' }">택배 알림
      </li>
      <li @click="changeTab('UserNotification')"
          :class="{ active: currentTab === 'UserNotification' }">생성 알림
      </li>
    </ul>
  </nav>

  <div v-if="currentTab === 'NotificationList'">
    <NotificationList/>
  </div>
  <div v-else-if="currentTab === 'ParcelNotification'">
    <ParcelNotification/>
  </div>
  <div v-else>
    <UserNotification/>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import NotificationList from "@/views/NotificationList.vue";
import UserNotification from "@/views/UserNotification.vue";
import ParcelNotification from "@/views/ParcelNotification.vue";

export default {
  components: {ParcelNotification, UserNotification, NotificationList},
  computed: {
    ...mapState('navigationStore', ['currentTab'])
  },
  methods: {
    ...mapActions('navigationStore', ['changeTab'])
  }
};
</script>

<style scoped>
nav {
  padding: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
  text-align: center;
}

li {
  font-size: 20px;
  display: inline;
  margin-right: 10px;
  cursor: pointer;
  color: dimgray;
  border-right: 2px solid orange;
}

li:last-child {
  border-right: none;
}

li.active {
  color: black;
  font-weight: bold;
}
</style>
