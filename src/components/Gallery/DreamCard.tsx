import { useI18n } from '@solid-primitives/i18n';
import classNames from 'classnames';
import { Icon } from 'solid-heroicons';
import { archiveBoxXMark, informationCircle } from 'solid-heroicons/solid-mini';
import { createSignal, Show, VoidComponent } from 'solid-js';

import { Dream } from '~/types';

export type DreamCardProps = {
  dream: Dream;
};

export const DreamCard: VoidComponent<DreamCardProps> = (props) => {
  const [showInfo, setShowInfo] = createSignal(false);
  const [t] = useI18n();

  return (
    <div role="group" class="card card-compact card-dreamlog bg-base-200 shadow-xl">
      <button class="btn-glass">
        <figure class="figure-dreamlog bg-neutral w-dreamlog-grid-width h-dreamlog-grid-width">
          <img src={props.dream.result} alt={props.dream.settings.prompt} />
        </figure>
      </button>
      <div class="card-body">
        <div class="overflow-x-hidden text-ellipsis whitespace-nowrap">
          {props.dream.settings.prompt}
        </div>
      </div>
      <div class="w-full justify-stretch">
        <div class="btn-group w-full justify-stretch">
          <button
            class={classNames(
              'btn btn-ghost border-t-base-300 border-r-base-300 gap-4 rounded-tl-none',
              {
                'btn-active': showInfo(),
              }
            )}
            onClick={() => setShowInfo((prev) => !prev)}
          >
            <Icon path={informationCircle} class="w-4 h-4 lg:w-6 lg:h-6" />
            <span>{t('dreamInfo')}</span>
          </button>
          <button class="btn btn-ghost border-t-base-300 grow">{t('dreamAction')}</button>
          <button class="btn btn-error gap-4 rounded-tr-none">
            <span>{t('dreamForget')}</span>
            <Icon path={archiveBoxXMark} class="w-4 h-4 lg:w-6 lg:h-6" />
          </button>
        </div>
      </div>
      <Show when={showInfo()}>
        <div class="absolute top-0 w-dreamlog-grid-width h-dreamlog-grid-width bg-base-300 card-body overflow-auto">
          {/* TODO: Make dream info pretty */}
          <p>{props.dream.date.toISOString().replace('T', ' @ ').replace(/\..*/, '')}</p>
          <pre>
            {JSON.stringify(
              props.dream.settings,
              (key, val) => (key === 'initimg' ? '(TODO)' : val),
              2
            )}
          </pre>
        </div>
      </Show>
    </div>
  );
};