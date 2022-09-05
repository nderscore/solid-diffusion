import { useI18n } from '@solid-primitives/i18n';
import type { VoidComponent } from 'solid-js';
import { Show } from 'solid-js';

import { CollapsibleFieldgroup } from '~/components/ui/CollapsibleFieldgroup';
import { useDreamSettingsField } from '~/state/DreamSettings';
import { useUiSettingsField } from '~/state/UiSettings';

import { GfpganEnabledField } from './GfpganEnabledField';
import { GfpganStrengthField } from './GfpganStrengthField';

export const GfpganFields: VoidComponent = () => {
  const [t] = useI18n();
  const [open, setOpen] = useUiSettingsField('gfpganFieldsOpen');
  const [enabled] = useDreamSettingsField('gfpgan_enabled');

  return (
    <CollapsibleFieldgroup
      label={t('settingsGroupGfpgan') + (enabled() ? ' — ' + t('enabled') : '')}
      open={open()}
      onClick={() => setOpen(!open())}
      id="settings-post-processing"
    >
      <GfpganEnabledField />
      <Show when={enabled()}>
        <GfpganStrengthField />
      </Show>
    </CollapsibleFieldgroup>
  );
};
