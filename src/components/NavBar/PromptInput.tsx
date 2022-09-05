import { useI18n } from '@solid-primitives/i18n';
import { useAtom } from 'reatom-solid';
import type { JSX, VoidComponent } from 'solid-js';

import { dreamsLoadedAtom } from '~/state/DreamLog';
import { useDreamSettingsField } from '~/state/DreamSettings';

export const PromptInput: VoidComponent = () => {
  const [t] = useI18n();
  const [promptValue, setPromptValue] = useDreamSettingsField('prompt');
  const [dreamsLoaded] = useAtom(dreamsLoadedAtom);

  const onInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (e) => {
    setPromptValue(e.currentTarget.value);
  };

  return (
    <input
      aria-label={t('prompt')}
      autofocus
      class="input input-md lg:input-lg w-0 input-bordered flex-grow"
      disabled={!dreamsLoaded()}
      name="prompt"
      onInput={onInput}
      placeholder={t('prompt_placeholder')}
      type="text"
      value={promptValue()}
    />
  );
};
