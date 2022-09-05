import { useI18n } from '@solid-primitives/i18n';
import { useAtom } from 'reatom-solid';
import { Icon } from 'solid-heroicons';
import { paperAirplane } from 'solid-heroicons/solid';
import type { VoidComponent } from 'solid-js';

import { dreamsLoadedAtom } from '~/state/DreamLog';
import { queueDream } from '~/state/DreamQueue';

import { PromptInput } from './PromptInput';

export const PromptForm: VoidComponent = () => {
  const [t] = useI18n();
  const [dreamsLoaded] = useAtom(dreamsLoadedAtom);

  return (
    <form
      class="form-control flex-grow"
      onSubmit={(e) => {
        e.preventDefault();
        const loaded = dreamsLoaded();
        if (loaded) {
          queueDream();
        }
      }}
    >
      <div class="input-group">
        <PromptInput />
        <button
          aria-label={t('dream')}
          class="btn sm:btn-square 2xl:w-auto 2xl:gap-2 lg:btn-lg btn-primary"
          disabled={!dreamsLoaded()}
          type="submit"
        >
          <div class="hidden 2xl:inline-block">{t('dream')}</div>
          <Icon path={paperAirplane} class="inline-block w-4 h-4 lg:w-6 lg:h-6" />
        </button>
      </div>
    </form>
  );
};
