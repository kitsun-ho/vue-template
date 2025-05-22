<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';

const counter = useCounterStore();
</script>

<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-8 text-teal-400">
      首頁
    </h1>
    <div class="max-w-400px mx-auto my-8 p-4 rounded-lg bg-gray-700">
      <h2 class="text-xl font-semibold mb-4 text-gray-100">
        {{ counter.name }}
      </h2>
      <p class="text-lg mb-4 text-gray-300">
        當前計數：{{ counter.count }}
      </p>
      <div class="flex gap-2 justify-center">
        <button
          class="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 active:bg-teal-700 transition-colors cursor-pointer"
          @click="counter.increment"
        >
          +1
        </button>
        <button
          class="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 active:bg-teal-700 transition-colors cursor-pointer"
          @click="counter.decrement"
        >
          -1
        </button>
        <button
          class="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 active:bg-teal-700 transition-colors cursor-pointer"
          @click="counter.reset"
        >
          重置
        </button>
        <button
          class="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 active:bg-teal-700 transition-colors cursor-pointer"
          @click="counter.fetchCount"
        >
          從 API 獲取
        </button>
      </div>
    </div>
  </div>
</template>
