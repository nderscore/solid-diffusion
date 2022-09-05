import { useI18n } from '@solid-primitives/i18n';
import { createMemo, VoidComponent } from 'solid-js';

import { Select } from '~/components/ui/Select';
import { themes } from '~/constants';
import { useUiSettingsField } from '~/state/UiSettings';

const optionsList = ['', ...themes];

export const ThemeSwitcher: VoidComponent = () => {
  const [t] = useI18n();
  const [theme, setTheme] = useUiSettingsField('theme');

  const options = createMemo(() => {
    const defaultLabel = t('settingsFieldThemeDefault') as string;
    return optionsList.map((option) => ({
      label: option || defaultLabel,
      value: option,
    }));
  });

  return (
    <Select
      class="select-bordered"
      label={t('settingsFieldTheme')}
      name="theme"
      options={options()}
      value={theme()}
      set={setTheme}
    />
  );
};
