import { useI18n } from '@solid-primitives/i18n';
import type { VoidComponent } from 'solid-js';

import { CollapsibleFieldgroup } from '~/components/ui/CollapsibleFieldgroup';
import { useUiSettingsField } from '~/state/UiSettings';

export const ImageInputFields: VoidComponent = () => {
  const [t] = useI18n();
  const [open, setOpen] = useUiSettingsField({ field: 'imageInputFieldsOpen' });

  return (
    <CollapsibleFieldgroup
      label={t('settingsGroupImageInput')}
      open={open()()}
      onClick={() => setOpen(!open()())}
      id="settings-image-input"
    >
      TODO: Image-to-image input
    </CollapsibleFieldgroup>
  );
};
