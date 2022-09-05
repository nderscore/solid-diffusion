import { useI18n } from '@solid-primitives/i18n';
import type { JSX } from 'solid-js';
import { VoidComponent } from 'solid-js';

import { useDreamSettingsField } from '~/state/DreamSettings';

export const RealEsrganScaleField: VoidComponent = () => {
  const [scale, setScale] = useDreamSettingsField('upscale_level');
  const [t] = useI18n();

  const onChange: JSX.EventHandler<HTMLInputElement, Event> = (e) =>
    setScale(parseInt(e.currentTarget.value) as 2 | 4);

  return (
    <div class="form-control flex-row gap-4">
      <label class="label cursor-pointer gap-4 w-1/2 justify-start">
        <input
          checked={scale() === 2}
          class="radio"
          name="real-esrgan-scale"
          onChange={onChange}
          type="radio"
          value="2"
        />
        <span class="label-text">{t('x2scale')}</span>
      </label>
      <label class="label cursor-pointer gap-4 w-1/2 justify-start">
        <input
          checked={scale() === 4}
          class="radio"
          name="real-esrgan-scale"
          onChange={onChange}
          type="radio"
          value="4"
        />
        <span class="label-text">{t('x4scale')}</span>
      </label>
    </div>
  );
};
