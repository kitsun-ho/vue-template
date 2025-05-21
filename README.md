# Vue 3 Template

基於 Vue 3 + Vite 打造的前端開發模板，預設整合 TypeScript、Pinia、UnoCSS、Naive UI 等常用工具，幫助你快速起手新專案。

## 🚀 特點 Features

- 🧱 **[Vue 3](https://vuejs.org/)** + **[Vite](https://vitejs.dev/)**：極速開發體驗，模組化支援
- 🧑‍💻 **[TypeScript](https://www.typescriptlang.org/)**：提高可維護性與開發體驗
- 📦 **[Pinia](https://pinia.vuejs.org/)**：官方推薦狀態管理
- 🧩 **[UnoCSS](https://github.com/unocss/unocss)**：極致輕量原子化 CSS，支援巢狀與 `@apply`
- 🎨 **[Naive UI](https://www.naiveui.com/)**：風格一致、主題友善的 Vue 3 UI 框架
- ⚙️ **[unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)** + **[unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)**：自動引入常用函式與元件
- 🔍 **[ESLint - @antfu/eslint-config](https://github.com/antfu/eslint-config)**：整合多種規範的高整合 ESLint 設定
- 🌐 **[Axios](https://axios-http.com/)**：API 請求模組化設計
- 🧠 **[VueUse](https://vueuse.org/)**：提供高可用性 Composition API 工具函式（如 `useDebounceRef`, `useStorage`）
- 🧰 **[Lodash-es](https://github.com/lodash/lodash)**：常用函式庫，支援 tree-shaking

## 🛠️ 開發建議

| 環境 | 建議 |
|------|------|
| 專案類型偏 SPA / 後台管理 | ✅ 本模板最適合 |
| ~~若需 SSR / SEO / PWA~~ | ~~⚠️ 請改用 [`nuxt-template`](https://github.com/kitsun-ho/nuxt-template)~~ |
| 若樣式自行手刻 | ❌ 無需 stylelint、UI 框架可拔除 |
| 嚴格測試文化 / CI 驗證 | ✅ 加入 Vitest 與 Coverage UI |

---

## 📜 License

MIT
