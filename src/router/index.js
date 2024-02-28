import {createRouter, createWebHistory} from 'vue-router';
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
    meta: {
      showHeader: true,
      isLoggedIn: true
    },
  },

  // 로그인 화면
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      showHeader: false,
      isLoggedIn: false,
    }
  },

  // 로그인 로딩 화면
  {
    path: '/login/oauth2/code/kakao',
    name: 'LoginHandler',
    component: LoginHandler,
    meta: {
      showHeader: true,
      isLoggedIn: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Vue Router 전역 네비게이션 가드 설정
router.beforeEach((to, from, next) => {
  const showHeader = to.meta.showHeader;
  const isLoggedIn = to.meta.isLoggedIn;

  // 헤더의 가시성을 설정
  store.dispatch('headerStore/updateHeaderVisibility', showHeader);

  // 로컬 스토리지에서 상태를 복원
  store.dispatch('authStore/restoreStateFromLocalStorage');

  const accessToken = sessionStorage.getItem('accessToken');
  // 인증이 필요한 페이지인데 액세스 토큰이 없는 경우 로그인 페이지로 이동
  if (isLoggedIn && !accessToken) {
    next('/login');
  } else {
    next(); // 다음 페이지로 이동
  }
});

export default router