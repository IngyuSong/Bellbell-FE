<template>
  <div class="card">
    <div class="card-body">
      <form @submit.prevent="activeNotification" class="needs-validation" novalidate>
        <div class="card-title">
          <span class="h5 fw-bold">오늘의 운세</span>
          <div class="form-check form-switch" style="float: right">
            <label class="form-check-label" :for="fortuneSwitchId">알림 활성화</label>
            <input class="form-check-input" type="checkbox" role="switch"
                   :id="fortuneSwitchId" v-model="checked"
                   @change="activeNotification(this.checked)">
          </div>
        </div>

        <div class="card-text">

          <!-- 성별 선택 -->
          <div class="mb-3">
            <div class="input-group">
              <label for="gender" class="form-control" id="genderLabel">성별</label>
              <select class="form-select" id="gender" v-model="gender" required :disabled="disabled">
                <option value="남">남</option>
                <option value="여">여</option>
              </select>
            </div>
            <div class="invalid-feedback" id="genderFeedback">성별을 선택하세요.</div>
          </div>

          <!-- 양력/음력 선택 -->
          <div class="mb-3">
            <div class="input-group">
              <label for="calendarType" class="form-control" id="calendarTypeLabel">양력/음력</label>
              <select class="form-select" id="calendarType" v-model="calendarType" required :disabled="disabled">
                <option value="양력">양력</option>
                <option value="음력">음력</option>
              </select>
            </div>
            <div class="invalid-feedback" id="calendarTypeFeedback">양력/음력을 선택하세요.</div>
          </div>

          <!-- 생년월일 입력 -->
          <div class="mb-3">
            <div class="input-group">
              <label for="birthdate" class="form-control">생년월일</label>
              <input type="date" class="form-control" id="birthdate" v-model="birthdate" onfocus="this.showPicker()" required :disabled="disabled">
            </div>
            <div class="invalid-feedback" id="birthdateFeedback">생년월일을 입력하세요.</div>
          </div>

          <!-- 태어난 시 선택 -->
          <div class="mb-3">
            <div class="input-group">
              <label for="birthTime" class="form-control" id="birthTimeLabel">태어난 시</label>
              <select class="form-select" id="birthTime" v-model="birthTime" required :disabled="disabled">
                <option value="모름">모름</option>
                <option value="子(자) 23:30 ~ 01:29">子(자) 23:30 ~ 01:29</option>
                <option value="丑(축) 01:30 ~ 03:29">丑(축) 01:30 ~ 03:29</option>
                <option value="寅(인) 03:30 ~ 05:29">寅(인) 03:30 ~ 05:29</option>
                <option value="卯(묘) 05:30 ~ 07:29">卯(묘) 05:30 ~ 07:29</option>
                <option value="辰(진) 07:30 ~ 09:29">辰(진) 07:30 ~ 09:29</option>
                <option value="巳(사) 09:30 ~ 11:29">巳(사) 09:30 ~ 11:29</option>
                <option value="午(오) 11:30 ~ 13:29">午(오) 11:30 ~ 13:29</option>
                <option value="未(미) 13:30 ~ 15:29">未(미) 13:30 ~ 15:29</option>
                <option value="申(신) 15:30 ~ 17:29">申(신) 15:30 ~ 17:29</option>
                <option value="酉(유) 17:30 ~ 19:29">酉(유) 17:30 ~ 19:29</option>
                <option value="戌(술) 19:30 ~ 21:29">戌(술) 19:30 ~ 21:29</option>
                <option value="亥(해) 21:30 ~ 23:29">亥(해) 21:30 ~ 23:29</option>
              </select>
            </div>
            <div class="invalid-feedback" id="birthTimeFeedback">태어난 시간대를 선택하세요.</div>
          </div>

        </div>

        <div class="card-text">
          <!-- 일 선택 버튼 -->
          <div class="input-group mb-3" id="day">
            <div>
              <input type="checkbox" :id="'fortuneSUN'" v-model="selectedDays" value="SUN" class="btn-check"
                     autocomplete="off" :disabled="disabled">
              <label class="btn btn-outline-primary" :for="'fortuneSUN'">일</label>
              <input type="checkbox" :id="'fortuneMON'" v-model="selectedDays" value="MON" class="btn-check"
                     autocomplete="off" :disabled="disabled">
              <label class="btn btn-outline-primary" :for="'fortuneMON'">월</label>
              <input type="checkbox" :id="'fortuneTUE'" v-model="selectedDays" value="TUE" class="btn-check"
                     autocomplete="off" :disabled="disabled">
              <label class="btn btn-outline-primary" :for="'fortuneTUE'">화</label>
              <input type="checkbox" :id="'fortuneWED'" v-model="selectedDays" value="WED" class="btn-check"
                     autocomplete="off" :disabled="disabled">
              <label class="btn btn-outline-primary" :for="'fortuneWED'">수</label>
              <input type="checkbox" :id="'fortuneTHU'" v-model="selectedDays" value="THU" class="btn-check"
                     autocomplete="off" :disabled="disabled">
              <label class="btn btn-outline-primary" :for="'fortuneTHU'">목</label>
              <input type="checkbox" :id="'fortuneFRI'" v-model="selectedDays" value="FRI" class="btn-check"
                     autocomplete="off" :disabled="disabled">
              <label class="btn btn-outline-primary" :for="'fortuneFRI'">금</label>
              <input type="checkbox" :id="'fortuneSAT'" v-model="selectedDays" value="SAT" class="btn-check"
                     autocomplete="off" :disabled="disabled">
              <label class="btn btn-outline-primary" :for="'fortuneSAT'">토</label>

              <button type="button" class="btn" id="daily" @click="toggleAllDays"
                      :disabled="disabled">매일
              </button>
              <div class="invalid-feedback" id="fortuneDayFeedback">알림 요일을 선택하세요.</div>
            </div>
          </div>

          <!-- 알림 시간 입력 -->
          <div class="input-group">
            <label for="fortuneTime" class="form-control">알림 시간</label>
            <input type="time" class="form-control" :id="'fortuneTime'" v-model="fortuneTime"
                   onfocus="this.showPicker()" required :disabled="disabled">
          </div>
          <div class="invalid-feedback" id="fortuneTimeFeedback">알림 시간을 입력하세요.</div>
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
import fortuneAPI from "@/service/fortuneAPI.js";

export default {
  async mounted() {
    const fortuneInfo = await fortuneAPI.getFortuneNotification();
    if (fortuneInfo) {
      // 운세 알림 정보가 있으면 스토어에 저장
      store.commit('fortuneStore/setNotification', fortuneInfo);
      this.checked = fortuneInfo.data.isActivated;
      this.fortuneTime = fortuneInfo.data.time;
      this.selectedDays = fortuneInfo.data.day === null ? [] : fortuneInfo.data.day.split(",");
      this.gender = fortuneInfo.data.gender;
      this.calendarType = fortuneInfo.data.calendarType;
      this.birthdate = fortuneInfo.data.birthdate;
      this.birthTime = fortuneInfo.data.birthTime;
      if (this.checked) {
        this.disabled = true;
      }
    }
  },
  data() {
    return {
      disabled: false,
      checked: false,
      fortuneTime: '',
      selectedDays: [],
      fortuneSwitchId: 'fortuneSwitch', // 각 컴포넌트의 고유한 ID 설정
      gender: '',
      calendarType: '',
      birthdate: '',
      birthTime: ''
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

      const fortune = {
        isActivated: this.checked,
        time: this.fortuneTime,
        day: this.selectedDays.toString(),
        gender: this.gender,
        calendarType: this.calendarType,
        birthdate: this.birthdate,
        birthTime: this.birthTime
      };

      const agreement = await userInfoAPI.checkTalkMessage();
      if (agreement === false) {
        alert('카카오톡 메시지 전송 동의 후 이용가능합니다.')
        window.location.href = import.meta.env.VITE_APP_KAKAO_AUTHORIZATION_URI
            + '&scope=talk_message';
      } else {
        this.$store.dispatch('fortuneStore/activateFortuneNotification', fortune);
        console.log(fortune);
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

      // 성별 유효성 검사
      const genderFeedback = document.getElementById('genderFeedback');
      if (!this.gender) {
        genderFeedback.style.display = 'block';
        isValid = false;
      } else {
        genderFeedback.style.display = 'none';
      }

      // 양력/음력 유효성 검사
      const calendarTypeFeedback = document.getElementById('calendarTypeFeedback');
      if (!this.calendarType) {
        calendarTypeFeedback.style.display = 'block';
        isValid = false;
      } else {
        calendarTypeFeedback.style.display = 'none';
      }

      // 생년월일 유효성 검사
      const birthdateFeedback = document.getElementById('birthdateFeedback');
      if (!this.birthdate) {
        birthdateFeedback.style.display = 'block';
        isValid = false;
      } else {
        birthdateFeedback.style.display = 'none';
      }

      // 태어난 시 유효성 검사
      const birthTimeFeedback = document.getElementById('birthTimeFeedback');
      if (!this.birthTime) {
        birthTimeFeedback.style.display = 'block';
        isValid = false;
      } else {
        birthTimeFeedback.style.display = 'none';
      }

      // 알림 시간 유효성 검사
      const timeInput = document.getElementById('fortuneTime');
      const timeFeedback = document.getElementById('fortuneTimeFeedback');
      if (!timeInput.checkValidity()) {
        timeFeedback.style.display = 'block';
        isValid = false;
      } else {
        timeFeedback.style.display = 'none';
      }

      // 알림 요일 유효성 검사
      const dayInputs = document.querySelectorAll(
          '[id^=fortuneSUN], [id^=fortuneMON], [id^=fortuneTUE], [id^=fortuneWED], [id^=fortuneTHU], [id^=fortuneFRI], [id^=fortuneSAT]');
      const dayFeedback = document.getElementById('fortuneDayFeedback');
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

#calendarTypeLabel, #genderLabel, #birthTimeLabel {
  padding-right: 35px;
}

</style>