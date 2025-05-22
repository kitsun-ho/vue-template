import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: '首頁',
      requiresAuth: false,
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: {
      title: '關於',
      requiresAuth: false,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      title: '找不到頁面',
      requiresAuth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' };
    }
    return { top: 0, behavior: 'smooth' };
  },
});

// 全域前置守衛
router.beforeEach((to, from, next) => {
  // 設定頁面標題
  document.title = `${to.meta.title} - 您的網站名稱`;

  // 檢查是否需要驗證
  if (to.meta.requiresAuth) {
    // 這裡可以加入驗證邏輯
    // const isAuthenticated = ...
    // if (!isAuthenticated) {
    //   next({ name: 'login' })
    //   return
    // }
  }
  next();
});

export default router;
