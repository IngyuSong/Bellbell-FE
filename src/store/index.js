import {createStore} from 'vuex';
import authStore from "@/store/modules/authStore.js";
import headerStore from "@/store/modules/headerStore.js";
import userStore from "@/store/modules/userStore.js";

export const store = createStore({
  modules: {
    headerStore,
    authStore,
    userStore,
  },
});
