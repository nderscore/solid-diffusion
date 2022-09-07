import { useI18n } from '@solid-primitives/i18n';
import { VoidComponent } from 'solid-js';

import { Toggle } from '~/components/ui/Toggle';
import { useDreamSettingsField } from '~/state/DreamSettings';

export const ResizetoFitField: VoidComponent = () => {
  const [t] = useI18n();
  const [enabled, setEnabled] = useDreamSettingsField('fit');

  return <Toggle label={t('fitImage')} name="fit-image" value={enabled()} set={setEnabled} />;
};
