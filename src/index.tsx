/* @refresh reload */
import { render } from 'solid-js/web';

import { App } from '~/components/App';
import { AppProviders } from '~/components/AppProviders';

render(
  () => (
    <AppProviders>
      <App />
    </AppProviders>
  ),
  // this better exist...
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  document.getElementById('root')!
);
