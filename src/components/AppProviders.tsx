import { I18nContext } from '@solid-primitives/i18n';
import { ParentComponent } from 'solid-js';

import I18nContextValue from '~/lang';

import { ThemeProvider } from './ThemeProvider';

export const AppProviders: ParentComponent = (props) => {
  return (
    <ThemeProvider>
      <I18nContext.Provider value={I18nContextValue}>{props.children}</I18nContext.Provider>
    </ThemeProvider>
  );
};
