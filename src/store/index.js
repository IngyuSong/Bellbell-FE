import {createStore} from 'vuex';
import authStore from "@/store/modules/authStore.js";
import headerStore from "@/store/modules/headerStore.js";
import userStore from "@/store/modules/userStore.js";
import modalStore from "@/store/modules/modalStore.js";
import notificationStore from "@/store/modules/notificationStore.js";
import navigationStore from "@/store/modules/navigationStore.js";

export const store = createStore({
  modules: {
    headerStore,
    authStore,
    userStore,
    notificationStore,
    modalStore,
    navigationStore
  },
});
