import type { VoidComponent } from 'solid-js';
import { Show } from 'solid-js';

import { Drawer } from '~/components/ui/Drawer';
import { FlexGutter } from '~/components/ui/FlexGutter';
import { featureDetectGFPGAN } from '~/constants';
import { useUiSettingsField } from '~/state/UiSettings';

import { GeneralFields } from './GeneralFields';
import { GfpganFields } from './GfpganFields';
import { ImageInputFields } from './ImageInputFields';
import { InterfaceFields } from './InterfaceFields';
import { RealEsrganFields } from './RealEsrganFields';

export const DreamSettings: VoidComponent = () => {
  const [settingsOpen] = useUiSettingsField({ field: 'settingsOpen' });

  return (
    <Show when={settingsOpen()()}>
      <Drawer class="left-0 z-10">
        <ImageInputFields />
        <GeneralFields />
        <Show when={featureDetectGFPGAN}>
          <GfpganFields />
        </Show>
        <RealEsrganFields />
        <FlexGutter />
        <InterfaceFields />
      </Drawer>
    </Show>
  );
};
