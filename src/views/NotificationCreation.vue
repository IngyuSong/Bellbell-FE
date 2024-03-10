<template>
  <div>
    <div class="text-center">
      <button class="btn btn-warning" @click="openModal">알림 생성</button>
    </div>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <div class="mb-3 header">
          <span class="h4">새로운 알림 생성</span>
          <button class="close btn-close" @click="closeModal"></button>
        </div>
        <form @submit.prevent="createNotification" class="needs-validation" novalidate>
          <div class="mb-3">
            <label for="content" class="form-label">알림 내용</label>
            <input type="text" class="form-control" id="content" v-model="content" required>
            <div class="invalid-feedback" id="contentFeedback">알림 내용을 입력하세요.</div>
          </div>

          <div class="mb-3">
            <label for="time" class="form-label">알림 시간</label>
            <input type="time" class="form-control" id="time" v-model="time"
                   onfocus="this.showPicker()" required>
            <div class="invalid-feedback" id="timeFeedback">알림 시간을 입력하세요.</div>
          </div>

          <div class="input-group mb-3" id="day">
            <div>
              <input type="checkbox" id="SUN" v-model="selectedDays" value="SUN" class="btn-check"
                     autocomplete="off">
              <label class="btn btn-outline-primary" for="SUN">일</label>

              <input type="checkbox" id="MON" v-model="selectedDays" value="MON" class="btn-check"
                     autocomplete="off">
              <label class="btn btn-outline-primary" for="MON">월</label>

              <input type="checkbox" id="TUE" v-model="selectedDays" value="TUE" class="btn-check"
                     autocomplete="off">
              <label class="btn btn-outline-primary" for="TUE">화</label>

              <input type="checkbox" id="WED" v-model="selectedDays" value="WED" class="btn-check"
                     autocomplete="off">
              <label class="btn btn-outline-primary" for="WED">수</label>

              <input type="checkbox" id="THU" v-model="selectedDays" value="THU" class="btn-check"
                     autocomplete="off">
              <label class="btn btn-outline-primary" for="THU">목</label>

              <input type="checkbox" id="FRI" v-model="selectedDays" value="FRI" class="btn-check"
                     autocomplete="off">
              <label class="btn btn-outline-primary" for="FRI">금</label>

              <input type="checkbox" id="SAT" v-model="selectedDays" value="SAT" class="btn-check"
                     autocomplete="off">
              <label class="btn btn-outline-primary" for="SAT">토</label>

              <button type="button" class="btn" id="daily" @click="toggleAllDays">매일</button>
              <div class="invalid-feedback" id="dayFeedback">알림 요일을 선택하세요.</div>
            </div>
          </div>

          <button type="submit" class="btn btn-success" id="submit">알림 생성</button>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import userInfoAPI from "@/service/userInfoAPI.js";

export default {
  computed: {
    ...mapState('modalStore', ['showModal']),
  },
  data() {
    return {
      content: '',
      time: '',
      selectedDays: []
    };
  },
  methods: {
    ...mapActions('modalStore', ['openModal', 'closeModal']),

    // 알림 생성 버튼 클릭 시 모달 열기
    async openModal() {
      this.content = '';
      this.time = '';
      this.selectedDays = [];
      const agreement = await userInfoAPI.checkTalkMessage();
      if (agreement === false) {
        alert('카카오톡 메시지 전송 동의 후 이용가능합니다.')
        window.location.href = import.meta.env.VITE_APP_KAKAO_AUTHORIZATION_URI
            + '&scope=talk_message';
      } else {
        this.$store.dispatch('modalStore/openModal');
      }
    },

    // 모달 닫기
    closeModal() {
      this.$store.dispatch('modalStore/closeModal');
      this.content = '';
      this.time = '';
      this.selectedDays = [];
    },

    toggleAllDays() {
      if (this.selectedDays.length === 7) {
        // 모든 요일이 선택된 상태이면 모든 요일을 해제합니다.
        this.selectedDays = [];
      } else {
        // 그렇지 않으면 모든 요일을 선택합니다.
        this.selectedDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
      }
    },
    async createNotification() {
      // 유효성 검사
      const isValid = this.validateForm();
      if (!isValid) {
        return;
      }

      const notification = {
        content: this.content,
        time: this.time,
        day: this.selectedDays.toString()
      };
      console.log(notification);
      this.$store.dispatch('notificationStore/createNotification', notification);
    },

    validateForm() {
      let isValid = true;

      // 알림 내용 유효성 검사
      const contentInput = document.getElementById('content');
      const contentFeedback = document.getElementById('contentFeedback');
      if (!contentInput.checkValidity()) {
        contentFeedback.style.display = 'block';
        isValid = false;
      } else {
        contentFeedback.style.display = 'none';
      }
      // 알림 시간 유효성 검사
      const timeInput = document.getElementById('time');
      const timeFeedback = document.getElementById('timeFeedback');
      if (!timeInput.checkValidity()) {
        timeFeedback.style.display = 'block';
        isValid = false;
      } else {
        timeFeedback.style.display = 'none';
      }

      // 알림 요일 유효성 검사
      const dayInputs = document.querySelectorAll(
          '[id^=SUN], [id^=MON], [id^=TUE], [id^=WED], [id^=THU], [id^=FRI], [id^=SAT]');
      const dayFeedback = document.getElementById('dayFeedback');
      let isAnyDaySelected = false;
      dayInputs.forEach(input => {
        if (input.checked) {
          isAnyDaySelected = true;
        }
      });
      if (!isAnyDaySelected) {
        dayFeedback.style.display = 'block';
        isValid = false;
      } else {
        dayFeedback.style.display = 'none';
      }

      return isValid;
    }
  }
};
</script>


<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.btn-success {
  float: right;
}

.close {
  color: #aaa;
  float: right;
  font-size: 20px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.btn-warning {
  font-weight: bold;
}

#daily {
  border: 1px solid gray;
}

.invalid-feedback {
  display: none;
  color: red;
}

</style>