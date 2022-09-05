import { useI18n } from '@solid-primitives/i18n';
import type { VoidComponent } from 'solid-js';

import { Slider } from '~/components/ui/Slider';
import { useDreamSettingsField } from '~/state/DreamSettings';

export const GuidanceScaleField: VoidComponent = () => {
  const [t] = useI18n();
  const [height, setCfg] = useDreamSettingsField('cfgscale');

  return (
    <Slider
      label={t('cfgScale')}
      max={20}
      min={-20}
      name="cfgscale"
      step={0.25}
      value={height()}
      set={setCfg}
    />
  );
};
