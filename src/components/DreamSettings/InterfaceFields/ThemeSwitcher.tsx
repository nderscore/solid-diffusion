import { useI18n } from '@solid-primitives/i18n';
import type { VoidComponent } from 'solid-js';
import { For, JSX } from 'solid-js';

import { ThemeName, themes } from '~/constants';
import { useUiSettingsField } from '~/state/UiSettings';

const options = ['', ...themes];

export const ThemeSwitcher: VoidComponent = () => {
  const [t] = useI18n();
  const [theme, setTheme] = useUiSettingsField('theme');

  const onChange: JSX.EventHandler<HTMLSelectElement, Event> = (e) => {
    setTheme(e.currentTarget.value as ThemeName | '');
  };

  return (
    <div class="form-control">
      <label class="label" for="theme">
        <span class="label-text">{t('settingsFieldTheme')}</span>
      </label>
      <select class="select select-bordered" name="theme" onChange={onChange}>
        <For each={options}>
          {(option) => (
            <option value={option} selected={option === theme()}>
              {option || t('settingsFieldThemeDefault')}
            </option>
          )}
        </For>
      </select>
    </div>
  );
};
