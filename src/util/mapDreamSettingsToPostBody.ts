import type { DreamSettings } from '~/types';

export const mapDreamSettingsToPostBody = (settings: DreamSettings) => {
  return {
    prompt: settings.prompt,
    iterations: 1,
    steps: `${settings.steps}`,
    cfgscale: `${settings.cfgscale}`,
    sampler: settings.sampler,
    width: `${settings.width}`,
    height: `${settings.height}`,
    seed: `${settings.seed}`,
    initimg: settings.initimg,
    strength: settings.initimg ? `${settings.strength}` : '0',
    fit: settings.initimg && settings.fit ? 'on' : '',
    gfpgan_strength: settings.gfpgan_enabled ? `${settings.gfpgan_strength}` : 0,
    upscale_level: settings.upscale_enabled ? `${settings.upscale_level}` : '',
    upscale_strength: settings.upscale_enabled ? `${settings.upscale_strength}` : '',
  };
};

export type DreamPostBody = ReturnType<typeof mapDreamSettingsToPostBody>;
