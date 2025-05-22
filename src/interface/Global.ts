export type MergeType<A, B> = {
  [K in keyof A | keyof B]: K extends keyof B
    ? B[K]
    : K extends keyof A
      ? A[K]
      : never;
};

export interface WsReq {
  id: string
  session: string
  [key: string]: string | number
}

export interface Perms {
  view: boolean // view
  edit: boolean // edit
}

export interface Page<T = any> {
  page: number // 當前頁數
  size: number // 每頁數量
  count: number // 資料總數
  items: T[] // 資料
}

export interface APIRes<T = string> {
  code: number
  message: string
  data: T
}

export type Order = 'descend' | 'ascend' | 'desc' | 'asc' | 'DESC' | 'ASC';

export interface Ordering {
  [key: string]: Order
}

export interface Options {
  value: string
  label: string
  disabled?: boolean
  key?: string
  show?: boolean
}
