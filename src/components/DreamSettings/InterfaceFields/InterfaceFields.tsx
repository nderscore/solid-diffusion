import { useI18n } from '@solid-primitives/i18n';
import type { VoidComponent } from 'solid-js';

import { CollapsibleFieldgroup } from '~/components/ui/CollapsibleFieldgroup';
import { useUiSettingsField } from '~/state/UiSettings';

import { ThemeSwitcher } from './ThemeSwitcher';

export const InterfaceFields: VoidComponent = () => {
  const [t] = useI18n();
  const [open, setOpen] = useUiSettingsField({ field: 'interfaceFieldsOpen' });

  return (
    <CollapsibleFieldgroup
      label={t('settingsGroupInterface')}
      open={open()()}
      onClick={() => setOpen(!open()())}
      id="settings-interface"
    >
      <ThemeSwitcher />
    </CollapsibleFieldgroup>
  );
};
