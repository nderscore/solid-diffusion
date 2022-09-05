import { useI18n } from '@solid-primitives/i18n';
import { VoidComponent } from 'solid-js';

import { Toggle } from '~/components/ui/Toggle';
import { useDreamSettingsField } from '~/state/DreamSettings';

export const GfpganEnabledField: VoidComponent = () => {
  const [t] = useI18n();
  const [enabled, setEnabled] = useDreamSettingsField('gfpgan_enabled');

  return (
    <Toggle
      label={t(enabled() ? 'enabled' : 'disabled')}
      name="gfpgan-enabled"
      value={enabled()}
      set={setEnabled}
    />
  );
};
