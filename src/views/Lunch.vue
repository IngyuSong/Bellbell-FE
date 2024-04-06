<template>
  <div class="card">
    <div class="card-body">
      <form @submit.prevent="activeNotification" class="needs-validation" novalidate>
        <div class="card-title">
          <span class="h5 fw-bold">점심 메뉴</span>
          <div class="form-check form-switch" style="float: right">
            <label class="form-check-label" :for="lunchSwitchId">알림 활성화</label>
            <input class="form-check-input" type="checkbox" role="switch"
                   :id="lunchSwitchId" v-model="checked"
                   @change="activeNotification(this.checked)">
          </div>
        </div>

        <div class="card-text">
          <!-- 일 선택 버튼 -->
          <div class="input-group mb-3" id="day">
            <div>
              <input type="checkbox" :id="'lunchSUN'" v-model="selectedDays" value="SUN" class="btn-check"
                     autocomplete="off" :disabled="disabled">
              <label class="btn btn-outline-primary" :for="'lunchSUN'">일</label>
              <input type="checkbox" :id="'lunchMON'" v-model="selectedDays" value="MON" class="btn-check"
                     autocomplete="off" :disabled="disabled">
              <label class="btn btn-outline-primary" :for="'lunchMON'">월</label>
              <input type="checkbox" :id="'lunchTUE'" v-model="selectedDays" value="TUE" class="btn-check"
                     autocomplete="off" :disabled="disabled">
              <label class="btn btn-outline-primary" :for="'lunchTUE'">화</label>
              <input type="checkbox" :id="'lunchWED'" v-model="selectedDays" value="WED" class="btn-check"
                     autocomplete="off" :disabled="disabled">
              <label class="btn btn-outline-primary" :for="'lunchWED'">수</label>
              <input type="checkbox" :id="'lunchTHU'" v-model="selectedDays" value="THU" class="btn-check"
                     autocomplete="off" :disabled="disabled">
              <label class="btn btn-outline-primary" :for="'lunchTHU'">목</label>
              <input type="checkbox" :id="'lunchFRI'" v-model="selectedDays" value="FRI" class="btn-check"
                     autocomplete="off" :disabled="disabled">
              <label class="btn btn-outline-primary" :for="'lunchFRI'">금</label>
              <input type="checkbox" :id="'lunchSAT'" v-model="selectedDays" value="SAT" class="btn-check"
                     autocomplete="off" :disabled="disabled">
              <label class="btn btn-outline-primary" :for="'lunchSAT'">토</label>

              <button type="button" class="btn" id="daily" @click="toggleAllDays"
                      :disabled="disabled">매일
              </button>
              <div class="invalid-feedback" id="lunchDayFeedback">알림 요일을 선택하세요.</div>
            </div>
          </div>

          <!-- 알림 시간 입력 -->
          <div class="input-group">
            <label for="lunchTime" class="form-control">알림 시간</label>
            <input type="time" class="form-control" :id="'lunchTime'" v-model="lunchTime"
                   onfocus="this.showPicker()" required :disabled="disabled">
          </div>
          <div class="invalid-feedback" id="lunchTimeFeedback">알림 시간을 입력하세요.</div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin-bottom: 10px;
}
</style>

<script>
import userInfoAPI from "@/service/userInfoAPI.js";
import {store} from "@/store/index.js";
import lunchAPI from "@/service/lunchAPI.js";

export default {
  async mounted() {
    const lunchInfo = await lunchAPI.getLunchNotification();
    if (lunchInfo) {
      // 점심알림 정보가 있으면 스토어에 저장
      store.commit('lunchStore/setNotification', lunchInfo);
      this.checked = lunchInfo.data.isActivated;
      this.lunchTime = lunchInfo.data.time;
      this.selectedDays = lunchInfo.data.day === null ? [] : lunchInfo.data.day.split(",");
      if (this.checked) {
        this.disabled = true;
      }
    }
  },
  data() {
    return {
      disabled: false,
      checked: false,
      lunchTime: '',
      selectedDays: [],
      lunchSwitchId: 'lunchSwitch' // 각 컴포넌트의 고유한 ID 설정
    };
  },
  methods: {
    async activeNotification(checked) {
      // 유효성 검사
      const isValid = this.validateForm();
      if (!isValid) {
        this.checked = false;
        return;
      }

      const lunch = {
        isActivated: this.checked,
        time: this.lunchTime,
        day: this.selectedDays.toString()
      };

      const agreement = await userInfoAPI.checkTalkMessage();
      if (agreement === false) {
        alert('카카오톡 메시지 전송 동의 후 이용가능합니다.')
        window.location.href = import.meta.env.VITE_APP_KAKAO_AUTHORIZATION_URI
            + '&scope=talk_message';
      } else {
        this.$store.dispatch('lunchStore/activateLunchNotification', lunch);
        console.log(lunch);
        this.disabled = checked;
      }
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
    validateForm() {
      let isValid = true;

      // 알림 시간 유효성 검사
      const timeInput = document.getElementById('lunchTime');
      const timeFeedback = document.getElementById('lunchTimeFeedback');
      if (!timeInput.checkValidity()) {
        timeFeedback.style.display = 'block';
        isValid = false;
      } else {
        timeFeedback.style.display = 'none';
      }

      // 알림 요일 유효성 검사
      const dayInputs = document.querySelectorAll(
          '[id^=lunchSUN], [id^=lunchMON], [id^=lunchTUE], [id^=lunchWED], [id^=lunchTHU], [id^=lunchFRI], [id^=lunchSAT]');
      const dayFeedback = document.getElementById('lunchDayFeedback');
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

<style>
#daily {
  border: 1px solid gray;
}
</style>