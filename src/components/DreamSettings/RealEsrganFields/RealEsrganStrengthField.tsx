import { useI18n } from '@solid-primitives/i18n';
import type { VoidComponent } from 'solid-js';

import { Slider } from '~/components/ui/Slider';
import { useDreamSettingsField } from '~/state/DreamSettings';

export const RealEsrganStrengthField: VoidComponent = () => {
  const [t] = useI18n();
  const [strength, setStength] = useDreamSettingsField('upscale_strength');

  return (
    <Slider
      label={t('realEsrganStrength')}
      max={100}
      min={0}
      name="realesrgan-strength"
      percentage
      step={1}
      value={strength()}
      set={setStength}
    />
  );
};
