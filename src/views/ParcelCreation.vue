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
          <div class="input-group mb-3">
            <label for="carrier" class="form-control fw-bold">택배사 선택</label>
            <select v-model="carrier" class="form-select" required>
              <option v-for="(carrier, index) in carriers" :key="index" :value="carrier.id">
                {{ carrier.name }}
              </option>
            </select>
            <div class="invalid-feedback" id="carrierFeedback">택배사를 선택하세요.</div>
          </div>
          <div class="input-group mb-3">
            <label for="trackingNo" class="form-control fw-bold">운송장 번호</label>
            <input type="text" class="form-control" id="trackingNo" v-model="trackingNo" required placeholder="- 없이 입력">
            <div class="invalid-feedback" id="trackingNoFeedback">운송장 번호를 입력하세요.</div>
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
import parcelAPI from "@/service/parcelAPI.js";

export default {
  computed: {
    ...mapState('modalStore', ['showModal']),
  },
  data() {
    return {
      carrier: '',
      carriers: [],
      trackingNo: ''
    };
  },
  methods: {
    ...mapActions('modalStore', ['openModal', 'closeModal']),

    // 알림 생성 버튼 클릭 시 모달 열기
    async openModal() {
      this.carrier = '';
      this.carriers = await parcelAPI.getCarriers();
      this.trackingNo = '';
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
      this.carrier = '';
      this.trackingNo = ''
    },

    async createNotification() {
      // 유효성 검사
      const isValid = this.validateForm();
      if (!isValid) {
        return;
      }

      const notification = {
        carrier: this.carrier,
        trackingNo: this.trackingNo
      };
      console.log(notification);
      this.$store.dispatch('parcelStore/createNotification', notification);
    },

    validateForm() {
      let isValid = true;

      // 택배사 유효성 검사
      const carrierFeedback = document.getElementById('carrierFeedback');
      if (!this.carrier) {
        carrierFeedback.style.display = 'block';
        isValid = false;
      } else {
        carrierFeedback.style.display = 'none';
      }
      // 운송장 번호 유효성 검사
      const trackingNoInput = document.getElementById('trackingNo');
      const trackingNoFeedback = document.getElementById('trackingNoFeedback');
      if (!trackingNoInput.checkValidity()) {
        trackingNoFeedback.style.display = 'block';
        isValid = false;
      } else {
        trackingNoFeedback.style.display = 'none';
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

.invalid-feedback {
  display: none;
  color: red;
}

#trackingNo {
  padding-right: 35px;
  border-top-right-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
}


</style>