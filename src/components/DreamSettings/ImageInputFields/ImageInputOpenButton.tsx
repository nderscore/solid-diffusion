import { useI18n } from '@solid-primitives/i18n';
import { JSX, VoidComponent } from 'solid-js';

import { setImageFromFileInput } from '~/state/CurrentImage';

export const ImageInputOpenButton: VoidComponent = () => {
  const [t] = useI18n();

  const onChange: JSX.EventHandler<HTMLInputElement, Event> = (e) => {
    setImageFromFileInput(e.currentTarget);
  };

  return (
    <label class="btn" role="button">
      <input
        type="file"
        name="image-input"
        class="sr-only"
        aria-hidden="true"
        onChange={onChange}
      />
      {t('open')}
    </label>
  );
};
