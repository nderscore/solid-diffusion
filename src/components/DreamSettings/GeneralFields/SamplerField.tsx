import { useI18n } from '@solid-primitives/i18n';
import { createMemo, VoidComponent } from 'solid-js';

import { Select } from '~/components/ui/Select';
import { samplers } from '~/constants';
import { useDreamSettingsField } from '~/state/DreamSettings';

const optionsList = samplers;

export const SamplerField: VoidComponent = () => {
  const [t] = useI18n();
  const [sampler, setSampler] = useDreamSettingsField('sampler');

  const options = createMemo(() => {
    return optionsList.map((option) => ({
      label: option,
      value: option,
    }));
  });

  return (
    <Select
      class="select-bordered"
      label={t('sampler')}
      name="sampler"
      options={options()}
      value={sampler()}
      set={setSampler}
    />
  );
};
