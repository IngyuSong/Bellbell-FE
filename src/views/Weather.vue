<template>
  <div class="card">
    <div class="card-body">
      <form @submit.prevent="activeNotification" class="needs-validation" novalidate>
        <div class="card-title">
          <span class="h5 fw-bold">날씨 및 옷차림</span>
          <div class="form-check form-switch" style="float: right">
            <label class="form-check-label" for="flexSwitchCheckDefault">알림 활성화</label>
            <input class="form-check-input" type="checkbox" role="switch"
                   id="flexSwitchCheckDefault" v-model="checked"
                   @change="activeNotification(this.checked)">
          </div>
        </div>

        <div class="card-text">
          <div class="input-group mb-3">
            <input type="button" class="btn btn-success" @click="execDaumPostcode" value="주소 검색"
                   :disabled="disabled">
            <input type="text" class="form-control" id="address" v-model="address"
                   @click="execDaumPostcode" readonly :disabled="disabled">
            <div class="invalid-feedback" id="addressFeedback">주소를 입력하세요.</div>
          </div>
          <div class="input-group mb-3" id="day">
            <div>
              <input type="checkbox" id="SUN" v-model="selectedDays" value="SUN" class="btn-check"
                     autocomplete="off" :disabled="disabled">
              <label class="btn btn-outline-primary" for="SUN">일</label>

              <input type="checkbox" id="MON" v-model="selectedDays" value="MON" class="btn-check"
                     autocomplete="off" :disabled="disabled">
              <label class="btn btn-outline-primary" for="MON">월</label>

              <input type="checkbox" id="TUE" v-model="selectedDays" value="TUE" class="btn-check"
                     autocomplete="off" :disabled="disabled">
              <label class="btn btn-outline-primary" for="TUE">화</label>

              <input type="checkbox" id="WED" v-model="selectedDays" value="WED" class="btn-check"
                     autocomplete="off" :disabled="disabled">
              <label class="btn btn-outline-primary" for="WED">수</label>

              <input type="checkbox" id="THU" v-model="selectedDays" value="THU" class="btn-check"
                     autocomplete="off" :disabled="disabled">
              <label class="btn btn-outline-primary" for="THU">목</label>

              <input type="checkbox" id="FRI" v-model="selectedDays" value="FRI" class="btn-check"
                     autocomplete="off" :disabled="disabled">
              <label class="btn btn-outline-primary" for="FRI">금</label>

              <input type="checkbox" id="SAT" v-model="selectedDays" value="SAT" class="btn-check"
                     autocomplete="off" :disabled="disabled">
              <label class="btn btn-outline-primary" for="SAT">토</label>

              <button type="button" class="btn" id="daily" @click="toggleAllDays"
                      :disabled="disabled">매일
              </button>
              <div class="invalid-feedback" id="dayFeedback">알림 요일을 선택하세요.</div>
            </div>
          </div>
          <div class="input-group">
            <label for="time" class="form-control">알림 시간</label>
            <input type="time" class="form-control" id="time" v-model="time"
                   onfocus="this.showPicker()" required :disabled="disabled">
          </div>
          <div class="invalid-feedback" id="timeFeedback">알림 시간을 입력하세요.</div>
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
import {store} from "@/store/index.js";
import weatherAPI from "@/service/weatherAPI.js";
import userInfoAPI from "@/service/userInfoAPI.js";

export default {
  async mounted() {
    const weatherInfo = await weatherAPI.getWeatherNotification();
    if (weatherInfo) {
      // 날씨 정보가 있으면 스토어에 저장
      store.commit('weatherStore/setNotification', weatherInfo);
      this.checked = weatherInfo.data.activated;
      this.address = weatherInfo.data.address;
      this.time = weatherInfo.data.time;
      this.selectedDays = weatherInfo.data.day === null ? [] : weatherInfo.data.day.split(",");
      if (this.checked) {
        this.disabled = true;
      }
    }
  },

  data() {
    return {
      disabled: false,
      checked: false,
      address: '',
      time: '',
      selectedDays: []
    };
  },
  methods: {
    execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            this.address = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            this.address = data.jibunAddress;
          }
        }
      }).open();
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
    async activeNotification(checked) {
      // 유효성 검사
      const isValid = this.validateForm();
      if (!isValid) {
        this.checked = false;
        return;
      }

      const weather = {
        isActivated: this.checked,
        address: this.address,
        time: this.time,
        day: this.selectedDays.toString()
      };

      const agreement = await userInfoAPI.checkTalkMessage();
      if (agreement === false) {
        alert('카카오톡 메시지 전송 동의 후 이용가능합니다.')
        window.location.href = import.meta.env.VITE_APP_KAKAO_AUTHORIZATION_URI
            + '&scope=talk_message';
      } else {
        this.$store.dispatch('weatherStore/activateWeatherNotification', weather);
        console.log(weather);
        this.disabled = checked;
      }
    },

    validateForm() {
      let isValid = true;

      // 주소 유효성 검사
      const addressFeedback = document.getElementById('addressFeedback');
      if (this.address === null || this.address === '') {
        addressFeedback.style.display = 'block';
        isValid = false;
      } else {
        addressFeedback.style.display = 'none';
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

<style>
#daily {
  border: 1px solid gray;
}

#address {
  border-top-right-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
}

</style>