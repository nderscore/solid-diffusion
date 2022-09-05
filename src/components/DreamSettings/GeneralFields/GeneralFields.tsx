import { useI18n } from '@solid-primitives/i18n';
import type { VoidComponent } from 'solid-js';

import { CollapsibleFieldgroup } from '~/components/ui/CollapsibleFieldgroup';
import { useUiSettingsField } from '~/state/UiSettings';

export const GeneralFields: VoidComponent = () => {
  const [t] = useI18n();
  const [open, setOpen] = useUiSettingsField('generalFieldsOpen');

  return (
    <CollapsibleFieldgroup
      label={t('settingsGroupGeneral')}
      open={open()}
      onClick={() => setOpen(!open())}
      id="settings-general"
    >
      TODO: General fields
    </CollapsibleFieldgroup>
  );
};
