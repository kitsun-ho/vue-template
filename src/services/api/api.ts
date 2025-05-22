import type { APIRes, Page, WsReq } from '@/interface/Global';
import { axiosReq, setWebSocket } from './requester';

interface LoginRes {
  id: string
  token: string
  refresh_token: string
}

interface GetDataRes {
  id: string
  name: string
  age: number
}

interface SearchDataRes {
  page: number
  size: number
  count: number
  items: GetDataRes[]
}

interface SearchDataReq {
  keyword: string
  page: number
  size: number
}

// API
export const API_LOGIN = () => axiosReq().post<LoginRes, LoginRes>('/login');
export const API_GET_DATA = () => axiosReq().get<GetDataRes, GetDataRes>('/data');
export const API_SEARCH_DATA = (data: SearchDataReq) => axiosReq().post<Page<SearchDataRes>, Page<SearchDataRes>>('/search', data);

// WebSocket
export const WS_TEST = ({ id, session }: WsReq, onMessage: (event: any) => void) => setWebSocket(`/websocket/?id=${id}&session=${session}`, onMessage);

// 範例
// async function test() {
//   const res = await API_LOGIN();
//   const { id: id3, token, refresh_token } = res;
//   console.log(id3, token, refresh_token);

//   const res = await API_GET_DATA();
//   const { id, name, age } = res;
//   console.log(id, name, age);

//   const res = await API_SEARCH_DATA({ keyword: 'test', page: 1, size: 10 });
//   const { page, size, count, items } = res;
//   console.log(page, size, count, items);
// }
