import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { CustomAxiosRequestConfig } from '@/stores/request';
import axios from 'axios';
import useRequestStore from '@/stores/request';

const baseURL = ''; // API domain，例如 import.meta.env.VITE_API_PATH
const token = ''; // token，例如 localStorage.getItem('token')
const successCode = 1; // 成功代碼

/**
 * 生成請求 ID
 * @param config - axios config
 * @returns ID = {method}:{url}:{params}:{data}
 */
function requestId(config: AxiosRequestConfig): string {
  return `${config.method || 'GET'}:${config.url}:${JSON.stringify(config.params || {})}:${JSON.stringify(config.data || {})}`;
}

/**
 * API請求器
 * @param setting - axios setting
 */
export function axiosReq<T = any>(setting?: object) {
  const response = axios.create();

  response.interceptors.request.use((config: CustomAxiosRequestConfig) => {
    const formDataReq = config.data instanceof FormData;
    // 設定ajax headers
    config.baseURL = baseURL;
    config.headers.Accept = 'application/json, text/plain, */*';
    config = { ...config, ...setting };
    config.headers['Content-Type'] = !formDataReq ? 'application/json' : 'multipart/form-data';
    config.headers.Authorization = `Bearer ${token}`;

    // 重複請求檢查
    const requestStore = useRequestStore(); // 取得全域請求管理 store
    const excludeList = ['']; // 排除不需要重複檢查的 URL（如登入/登出等單次請求）
    if (!excludeList.some(item => config.url?.includes(item))) {
      const id = requestId(config);
      config.id = id;

      requestStore.cancelRequest(id); // 取消已存在相同 ID的請求（防止重複請求）

      // 把請求註冊到 store
      const signal = requestStore.addRequest(id);
      config.signal = signal;
    }

    return config;
  });

  response.interceptors.response.use((res) => {
    // 清除對應的 AbortController
    const requestStore = useRequestStore();
    const { id = '' } = res.config as CustomAxiosRequestConfig;
    requestStore.releaseRequest(id);

    // 若格式不對，則回傳資料，交由上層處理
    // if (!('code' in res.data))
    //   return res.data;

    const { code, message, data: result, ...others } = res.data;

    // 若不是成功的 code，則拋出錯誤
    if (successCode !== code)
      return Promise.reject(new Error(`${code}: ${message}`));

    // 回傳資料
    if (Object.keys(others).length)
      return { ...result, ...others };

    return result as T;
  }, async (error) => {
    const { code } = error;

    // 被主動取消的請求（由 AbortController發動）不提示錯誤
    if (code === 'ERR_CANCELED')
      return Promise.resolve();

    return Promise.reject(error);
  });

  return response;
}

/**
 * 默認WebSocket setting
 * @param url - 連線URL
 * @param onMessage - 當返回 message = 'close'時執行的程序
 * @returns WebSocket
 */
export function setWebSocket(url: string, onMessage?: (data: any) => void) {
  const hasSlash = /\/$/.test(baseURL) || /^\//.test(url); // 檢查 baseURL 或 url 是否以斜線結尾
  const ws: WebSocket = new WebSocket(`${baseURL}${!hasSlash ? '/' : ''}${url}`);

  if (onMessage) {
    ws.onmessage = async (e) => {
      const { message, data } = JSON.parse(e.data);
      // 自行設定處理方式，以下為範例
      switch (message) {
        case 'success':
        case 'logout':
          await onMessage(data);
          break;
        case 'close':
          ws.close();
          break;
        default:
          await onMessage(JSON.parse(e.data));
      }
    };
  }
  return ws;
}
