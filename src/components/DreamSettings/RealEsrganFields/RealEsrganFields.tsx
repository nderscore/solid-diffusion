import { useI18n } from '@solid-primitives/i18n';
import type { VoidComponent } from 'solid-js';

import { CollapsibleFieldgroup } from '~/components/ui/CollapsibleFieldgroup';
import { useUiSettingsField } from '~/state/UiSettings';

export const RealEsrganFields: VoidComponent = () => {
  const [t] = useI18n();
  const [open, setOpen] = useUiSettingsField({ field: 'realEsrganFieldsOpen' });

  return (
    <CollapsibleFieldgroup
      label={t('settingsGroupRealEsrgan')}
      open={open()()}
      onClick={() => setOpen(!open()())}
      id="settings-realesrgan"
    >
      TODO: RealESRGAN fields
    </CollapsibleFieldgroup>
  );
};
