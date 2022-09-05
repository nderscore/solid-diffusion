import { createAtom } from '@reatom/core';
import { useAction, useAtom } from 'reatom-solid';
import { createMemo } from 'solid-js';

import { ThemeName, viewportLargeQuery } from '~/constants';
import { createLocalStorageAtom } from '~/util/createLocalStorageAtom';

export type UiSettings = {
  generalFieldsOpen: boolean;
  imageInputFieldsOpen: boolean;
  interfaceFieldsOpen: boolean;
  gfpganFieldsOpen: boolean;
  queueOpen: boolean;
  realEsrganFieldsOpen: boolean;
  settingsOpen: boolean;
  theme: ThemeName | '';
};

export const defaultSettings: UiSettings = {
  generalFieldsOpen: true,
  imageInputFieldsOpen: true,
  interfaceFieldsOpen: true,
  gfpganFieldsOpen: true,
  queueOpen: false,
  realEsrganFieldsOpen: true,
  settingsOpen: viewportLargeQuery.matches,
  theme: '',
};

export const uiSettingsAtom = createLocalStorageAtom('uiSettings', defaultSettings);

export const useUiSettings = () => useAtom(uiSettingsAtom);

export const useUiSettingsField = <K extends keyof UiSettings, V = UiSettings[K]>(props: {
  field: K;
}) => {
  const updateSettings = useAction(uiSettingsAtom.update);
  const value = createMemo(() => {
    const atom = createAtom({ uiSettingsAtom }, ({ get }) => get('uiSettingsAtom')[props.field]);
    const [value] = useAtom(atom);
    return value;
  });
  const setValue = (value: V) => {
    updateSettings({ [props.field]: value });
  };
  return [value, setValue] as const;
};
