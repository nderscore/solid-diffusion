import { useI18n } from '@solid-primitives/i18n';
import { VoidComponent } from 'solid-js';

import { resetImageData } from '~/state/CurrentImage';

export const ClearImageInputButton: VoidComponent = () => {
  const [t] = useI18n();

  return (
    <button class="btn" onClick={resetImageData}>
      {t('clear')}
    </button>
  );
};
