import type { InternalAxiosRequestConfig } from 'axios';
import { defineStore } from 'pinia';

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  id?: string
}

export default defineStore('RequestStore', () => {
  const activeRequests = ref(new Map<string, AbortController>());

  function addRequest(uuid: string) {
    const controller = new AbortController();
    activeRequests.value.set(uuid, controller);
    return controller.signal;
  }

  function cancelRequest(uuid: string) {
    const controller = activeRequests.value.get(uuid);

    if (controller) {
      controller.abort();
      activeRequests.value.delete(uuid);
    }
  }

  function cancelAllRequests() {
    activeRequests.value.forEach(controller => controller.abort());
    activeRequests.value.clear();
  }

  function releaseRequest(uuid: string) {
    activeRequests.value.delete(uuid);
  }

  return {
    activeRequests,
    addRequest,
    cancelRequest,
    cancelAllRequests,
    releaseRequest, // ✅ 記得導出
  };
});
