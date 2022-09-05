import { useI18n } from '@solid-primitives/i18n';
import { useAtom } from 'reatom-solid';
import { For, Show, VoidComponent } from 'solid-js';

import { dreamLogAtom, dreamsLoadedAtom } from '~/state/DreamLog';

import { DreamCard } from './DreamCard';

export const Gallery: VoidComponent = () => {
  const [dreamsLoaded] = useAtom(dreamsLoadedAtom);
  const [dreamLog] = useAtom(dreamLogAtom);
  const [t] = useI18n();

  return (
    <div class="flex-grow max-h-screen-navbar overflow-x-hidden overflow-y-auto">
      <div class="grid grid-dreamlog gap-2 lg:gap-4 p-2 lg:p-4">
        <Show when={dreamsLoaded()} fallback={t('loadingDreams')}>
          <For each={dreamLog()}>{(dream) => <DreamCard dream={dream} />}</For>
        </Show>
      </div>
    </div>
  );
};
