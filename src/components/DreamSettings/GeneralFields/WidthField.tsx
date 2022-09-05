import { useI18n } from '@solid-primitives/i18n';
import type { VoidComponent } from 'solid-js';

import { Slider } from '~/components/ui/Slider';
import { useDreamSettingsField } from '~/state/DreamSettings';

export const WidthField: VoidComponent = () => {
  const [t] = useI18n();
  const [width, setWidth] = useDreamSettingsField('width');

  return (
    <Slider
      label={t('width')}
      max={1024}
      min={64}
      name="width"
      step={64}
      value={width()}
      set={setWidth}
    />
  );
};
