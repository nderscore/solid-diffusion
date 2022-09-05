import { createEffect, ParentComponent } from 'solid-js';

import type { ThemeName } from '~/constants';
import { useUiSettingsField } from '~/state/UiSettings';

const dataAttr = 'theme';
const dataAttrDom = `data-${dataAttr}`;

const syncThemeToDom = (theme: ThemeName | '') => {
  document.documentElement.setAttribute(dataAttrDom, theme);
};

export const ThemeProvider: ParentComponent = (props) => {
  const [theme] = useUiSettingsField({ field: 'theme' });

  createEffect(() => {
    syncThemeToDom(theme()());
  });

  return <>{props.children}</>;
};
