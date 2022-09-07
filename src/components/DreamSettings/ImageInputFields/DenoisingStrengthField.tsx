import { useI18n } from '@solid-primitives/i18n';
import type { VoidComponent } from 'solid-js';

import { Slider } from '~/components/ui/Slider';
import { useDreamSettingsField } from '~/state/DreamSettings';

export const DenoisingStrengthField: VoidComponent = () => {
  const [t] = useI18n();
  const [strength, setStength] = useDreamSettingsField('strength');

  return (
    <Slider
      label={t('denoisingStrength')}
      max={100}
      min={0}
      name="denoising-strength"
      percentage
      step={1}
      value={strength()}
      set={setStength}
    />
  );
};
