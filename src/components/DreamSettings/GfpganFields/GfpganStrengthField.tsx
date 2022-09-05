import { useI18n } from '@solid-primitives/i18n';
import type { VoidComponent } from 'solid-js';

import { Slider } from '~/components/ui/Slider';
import { useDreamSettingsField } from '~/state/DreamSettings';

export const GfpganStrengthField: VoidComponent = () => {
  const [t] = useI18n();
  const [strength, setStength] = useDreamSettingsField('gfpgan_strength');

  return (
    <Slider
      label={t('gfpganStrength')}
      max={100}
      min={0}
      name="gfpgan-strength"
      percentage
      step={1}
      value={strength()}
      set={setStength}
    />
  );
};
