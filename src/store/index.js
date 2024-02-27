import { createStore } from 'vuex';
import userStore from "@/store/modules/userStore.js";
import headerStore from "@/store/modules/headerStore.js";

export const store = createStore({
  modules: {
    headerStore,
    userStore
  },
});
