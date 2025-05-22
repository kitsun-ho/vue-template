<script setup lang="ts">
// 元件邏輯
</script>

<template>
  <div class="font-sans antialiased text-center text-gray-100 bg-gray-800 min-h-screen">
    <nav class="py-8">
      <router-link
        to="/"
        class="font-bold text-gray-100 no-underline mx-2.5 hover:text-teal-400 transition-colors"
        :class="{ 'text-teal-400': $route.path === '/' }"
      >
        首頁
      </router-link>
      |
      <router-link
        to="/about"
        class="font-bold text-gray-100 no-underline mx-2.5 hover:text-teal-400 transition-colors"
        :class="{ 'text-teal-400': $route.path === '/about' }"
      >
        關於
      </router-link>
    </nav>
    <router-view />
  </div>
</template>
