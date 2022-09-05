import type { SamplerName } from '~/constants';

export type DreamSettings = {
  /**
   * The prompt string
   */
  prompt: string;
  /**
   * The number of images to produce
   */
  iterations: number;
  /**
   * The number of steps to run per image
   */
  steps: number;
  /**
   * Clip Free Guideance scale
   */
  cfgscale: number;
  /**
   * Sampler
   */
  sampler: SamplerName;
  /**
   * Width (multiple of 64)
   */
  width: number;
  /**
   * Width (multiple of 64)
   */
  height: number;
  /**
   * Seed
   */
  seed: number;
  /**
   * Initial image (image-to-image)
   */
  initimg: Blob | null;
  /**
   * Denoising strength (image-to-image)
   */
  strength: number;
  /**
   * RealESRGAN scaling level
   */
  upscale_level: 2 | 4;
  /**
   * RealESRGAN strength
   */
  upscale_strength: number;
  /**
   * GFPGAN strength
   */
  gfpgan_strength: number;

  // --- custom settings ------

  /**
   * Randomize Seed
   */
  random: boolean;
  /**
   * Resize image to fit
   */
  fit: boolean;
  /**
   * GFPGAN enabedDreamSettings
   */
  gfpgan_enabled: boolean;
  /**
   * RealESRGAN enabed
   */
  upscale_enabled: boolean;
};

export type Dream = {
  id: string;
  result: string;
  settings: DreamSettings;
  date: Date;
};
