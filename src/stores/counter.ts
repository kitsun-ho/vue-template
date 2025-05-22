import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useCounterStore = defineStore('counter', () => {
  // state
  const count = ref(0);
  const name = ref('計數器');

  // actions
  function increment() {
    count.value++;
  }

  function decrement() {
    count.value--;
  }

  function reset() {
    count.value = 0;
  }

  async function fetchCount() {
    // 模擬 API 請求
    const response = await new Promise<number>((resolve) => {
      setTimeout(() => resolve(10), 1000);
    });
    count.value = response;
  }

  return {
    // state
    count,
    name,
    // actions
    increment,
    decrement,
    reset,
    fetchCount,
  };
});
