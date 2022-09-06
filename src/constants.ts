export const themes = [
  'dark',
  'light',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
] as const;

export type ThemeName = typeof themes[number];

export const samplers = [
  'ddim',
  'plms',
  'k_lms',
  'k_dpm_2',
  'k_dpm_2_a',
  'k_euler',
  'k_euler_a',
  'k_heun',
] as const;

export type SamplerName = typeof samplers[number];

export const endpoints = {
  cancel: '/cancel',
  dream: '/dream',
};

export const viewportLargeQuery = window.matchMedia('(min-width: 1024px)');

export const remoteConfig = (
  globalThis as {
    SD_remoteConfig?: { gfpgan_model_exists: boolean };
  }
).SD_remoteConfig;

export const featureDetectGFPGAN = !!remoteConfig?.gfpgan_model_exists;

export const scrollbarBaseColors =
  'scrollbar-track-base-200 scrollbar-thumb-base-300 hover:scrollbar-thumb-base-content hover:scrollbar-track-base-300 scrollbar-corner-base-300';
