import { useI18n } from '@solid-primitives/i18n';
import type { VoidComponent } from 'solid-js';
import { Show } from 'solid-js';

import { CollapsibleFieldgroup } from '~/components/ui/CollapsibleFieldgroup';
import { useDreamSettingsField } from '~/state/DreamSettings';
import { useUiSettingsField } from '~/state/UiSettings';

import { RealEsrganEnabledField } from './RealEsrganEnabledField';

export const RealEsrganFields: VoidComponent = () => {
  const [t] = useI18n();
  const [open, setOpen] = useUiSettingsField('realEsrganFieldsOpen');
  const [enabled] = useDreamSettingsField('upscale_enabled');

  return (
    <CollapsibleFieldgroup
      label={t('settingsGroupRealEsrgan') + (enabled() ? ' — ' + t('enabled') : '')}
      open={open()}
      onClick={() => setOpen(!open())}
      id="settings-realesrgan"
    >
      <RealEsrganEnabledField />
      <Show when={enabled()}>TODO: RealESRGAN fields</Show>
    </CollapsibleFieldgroup>
  );
};
