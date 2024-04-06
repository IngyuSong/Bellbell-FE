<template>
  <div>
    <!-- 알림 목록 -->
    <div class="card" v-for="(notification, index) in displayedNotifications" :key="index">
      <div class="card-body">
        <h5 class="card-title mb-3">운송장: {{getNameById(notification.carrier)}} {{ notification.trackingNo }}</h5>
        <table class="text-center mb-3">
          <tr class="table-info">
            <th>시간</th>
            <th>상태</th>
            <th>위치</th>
            <th>상세</th>
          </tr>
          <tr v-for="trackingInfo in notification.trackingInfoList">
            <td>{{trackingInfo.time.replace('T',' ').substring(0, trackingInfo.time.length - 3)}}</td>
            <td>{{trackingInfo.status}}</td>
            <td>{{trackingInfo.location}}</td>
            <td>{{trackingInfo.description}}</td>
          </tr>
        </table>
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
import {store} from "@/store/index.js";
import parcelAPI from "@/service/parcelAPI.js";
import {mapState} from "vuex";
import ParcelCreation from "@/views/ParcelCreation.vue";


export default {
  components: {ParcelCreation},
  async mounted() {
    await this.fetchNotifications();
    this.carriers = await parcelAPI.getCarriers();
  },
  computed: {
    ...mapState('parcelStore', ['notifications']),
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
      pageSize: 3, // 페이지 당 표시할 알림 수
      carriers: []
    };
  },
  methods: {
    async fetchNotifications() {
      const notifications = await parcelAPI.fetchNotifications();
      if (notifications) {
        // 가져올 알림 알림이 있으면 스토어에 저장
        await store.dispatch("parcelStore/fetchNotifications");
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
        await parcelAPI.deleteNotification(notificationId);
        console.log("알림삭제 성공");
        await this.fetchNotifications(); // 알림 목록 다시 불러오기
      } catch (error) {
        console.error('택배 알림 삭제에 실패했습니다:', error);
      }
    },
    getNameById(carrierId) {
    // 주어진 id에 해당하는 객체 찾기
      const carrier = this.carriers.find(carrier => carrier.id === carrierId);

      // 객체가 존재할 경우 name 반환, 존재하지 않을 경우 'Not found' 반환
      return carrier ? carrier.name : 'Not found';
    }
  },

};
</script>

<style scoped>
.card {
  margin-bottom: 10px;
}
table,th,td {
  border: 1px solid black;
  padding: 5px;
}
table {
  margin: 0 auto;
}
</style>
