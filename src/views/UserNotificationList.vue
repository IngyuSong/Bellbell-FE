<template>
  <div>
    <!-- 알림 목록 -->
    <div class="card" v-for="(notification, index) in displayedNotifications" :key="index">
      <div class="card-body">
        <h5 class="card-title">{{ notification.content }}</h5>
        <p class="card-text">요일: {{ notification.day }} 시간: {{ notification.time }}</p>
        <div class="text-center">
          <button class="btn btn-danger" @click="deleteNotification(notification.id)">삭제</button>
        </div>

      </div>
    </div>

    <!-- 페이징 컨트롤 -->
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click="previousPage">이전</a>
        </li>
        <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber"
            :class="{ active: pageNumber === currentPage }">
          <a class="page-link" href="#" @click="changePage(pageNumber)">{{ pageNumber }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click="nextPage">다음</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {store} from "@/store/index.js";
import notificationAPI from "@/service/notificationAPI.js";

export default {
  async mounted() {
    await this.fetchNotifications();
  },
  computed: {
    ...mapState('notificationStore', ['notifications']),
    displayedNotifications() {
      // 알림을 내림차순으로 정렬하고 현재 페이지의 알림만 반환
      const sortedNotifications = this.notifications.slice().sort((a, b) => {
        return b.id - a.id; // 내림차순 정렬
      });
      // 현재 페이지의 알림만 반환
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return sortedNotifications.slice(startIndex, endIndex);
    },
    totalPages() {
      // 전체 페이지 수 계산
      return Math.ceil(this.notifications.length / this.pageSize);
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5 // 페이지 당 표시할 알림 수
    };
  },
  methods: {
    async fetchNotifications() {
      const notifications = await notificationAPI.fetchNotifications();
      if (notifications) {
        // 가져올 알림 알림이 있으면 스토어에 저장
        await store.dispatch("notificationStore/fetchNotifications");
      }
    },
    changePage(pageNumber) {
      this.currentPage = pageNumber;
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    async deleteNotification(notificationId) {
      try {
        await notificationAPI.deleteNotification(notificationId);
        await this.fetchNotifications(); // 알림 목록 다시 불러오기
      } catch (error) {
        console.error('알림 삭제에 실패했습니다:', error);
      }
    }
  }
};
</script>

<style scoped>
.card {
  margin-bottom: 10px;
}
</style>
