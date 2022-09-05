import { useI18n } from '@solid-primitives/i18n';
import type { VoidComponent } from 'solid-js';

import { Slider } from '~/components/ui/Slider';
import { useDreamSettingsField } from '~/state/DreamSettings';

export const HeightField: VoidComponent = () => {
  const [t] = useI18n();
  const [height, setHeight] = useDreamSettingsField('height');

  return (
    <Slider
      label={t('height')}
      max={1024}
      min={64}
      name="height"
      step={64}
      value={height()}
      set={setHeight}
    />
  );
};
