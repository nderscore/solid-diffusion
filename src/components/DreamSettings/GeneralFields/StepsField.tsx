import { useI18n } from '@solid-primitives/i18n';
import type { VoidComponent } from 'solid-js';

import { Slider } from '~/components/ui/Slider';
import { useDreamSettingsField } from '~/state/DreamSettings';

export const StepsField: VoidComponent = () => {
  const [t] = useI18n();
  const [steps, setSteps] = useDreamSettingsField('steps');

  return (
    <Slider
      label={t('steps')}
      max={200}
      min={1}
      name="steps"
      step={1}
      value={steps()}
      set={setSteps}
      warn={steps() <= 10 || steps() > 100}
    />
  );
};
