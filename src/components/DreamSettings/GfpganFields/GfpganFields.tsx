import { useI18n } from '@solid-primitives/i18n';
import type { VoidComponent } from 'solid-js';

import { CollapsibleFieldgroup } from '~/components/ui/CollapsibleFieldgroup';
import { useUiSettingsField } from '~/state/UiSettings';

export const GfpganFields: VoidComponent = () => {
  const [t] = useI18n();
  const [open, setOpen] = useUiSettingsField('gfpganFieldsOpen');

  return (
    <CollapsibleFieldgroup
      label={t('settingsGroupGfpgan')}
      open={open()}
      onClick={() => setOpen(!open())}
      id="settings-post-processing"
    >
      TODO: GFPGAN fields
    </CollapsibleFieldgroup>
  );
};
