import { defineConfig, presetAttributify, presetIcons, presetWebFonts, presetWind3, transformerDirectives } from 'unocss';

export default defineConfig({
  // 預設值
  presets: [
    presetWind3(),
    presetAttributify({ prefix: 'uno-' }),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [transformerDirectives()],
  // 自定義規則
  rules: [
    // 自定義規則
  ],
  // 自定義快捷方式
  shortcuts: [
    // 自定義快捷方式
  ],
  // 主題設定
  theme: {
    colors: {
      // 自定義顏色
    },
  },
});
