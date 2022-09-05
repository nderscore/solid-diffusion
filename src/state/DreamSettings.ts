import { createAtom } from '@reatom/core';
import { useAction, useAtom } from 'reatom-solid';
import { createMemo } from 'solid-js';

import { DreamSettings } from '~/types';
import { createLocalStorageAtom } from '~/util/createLocalStorageAtom';

/**
 * Store all dream settings except init image in stored state
 */
export type DreamSettingsAtomType = Omit<DreamSettings, 'initimg'>;

export const defaultSettings: DreamSettingsAtomType = {
  prompt: '',
  iterations: 1,
  steps: 50,
  cfgscale: 7.5,
  sampler: 'k_lms',
  width: 512,
  height: 512,
  seed: -1,
  strength: 0.75,
  fit: true,
  gfpgan_enabled: false,
  gfpgan_strength: 0.75,
  upscale_enabled: false,
  upscale_level: 2,
  upscale_strength: 0.75,
  random: true,
};

export const dreamSettingsAtom = createLocalStorageAtom('dreamSettings', defaultSettings);

export const useDreamSettings = () => useAtom(dreamSettingsAtom);

export const useDreamSettingsField = <K extends keyof DreamSettingsAtomType, V = DreamSettings[K]>(
  field: K
) => {
  const updateSettings = useAction(dreamSettingsAtom.update);
  const value = createMemo(() => {
    const atom = createAtom({ dreamSettingsAtom }, ({ get }) => get('dreamSettingsAtom')[field]);
    const [value] = useAtom(atom);
    return value;
  });
  const setValue = (value: V) => {
    updateSettings({ [field]: value });
  };
  const getValue = () => value()();
  return [getValue, setValue] as const;
};
