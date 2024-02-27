import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue'
import Login from "@/views/Login.vue";
import LoginHandler from "@/views/LoginHandler.vue";
import {store} from "@/store/index.js";

const routes = [
  // 홈 화면
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {showHeader: true}
  },

  // 로그인 화면
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {showHeader: false}
  },

  // 로그인 로딩 화면
  {
    path: '/login/oauth2/code/kakao',
    name: 'LoginHandler',
    component: LoginHandler,
    meta: {showHeader: true}
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Vue Router 전역 네비게이션 가드 설정
router.beforeEach((to, from, next) => {
  const showHeader = to.meta.showHeader !== false; // 기본값은 true로 설정

  // 헤더의 가시성을 설정
  store.dispatch('headerStore/updateHeaderVisibility', showHeader);

  // 로컬 스토리지에서 상태를 복원
  store.dispatch('userStore/restoreStateFromLocalStorage');

  next();
});


export default router