<template>
  <nav>
    <ul>
      <li @click="changeTab('NotificationList')"
          :class="{ active: currentTab === 'NotificationList' }">기본 알림
      </li>
      <li @click="changeTab('UserNotification')"
          :class="{ active: currentTab === 'UserNotification' }">사용자 알림
      </li>
    </ul>
  </nav>

  <div v-if="currentTab === 'NotificationList'">
    <NotificationList/>
  </div>
  <div v-else>
    <UserNotification/>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import NotificationList from "@/views/NotificationList.vue";
import UserNotification from "@/views/UserNotification.vue";

export default {
  components: {UserNotification, NotificationList},
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
  font-size: 25px;
  display: inline;
  margin-right: 10px;
  cursor: pointer;
  color: dimgray;
}

li:first-child {
  padding-right: 10px;
  border-right: 2px solid orange;
}

li.active {
  color: black;
  font-weight: bold;
}
</style>
