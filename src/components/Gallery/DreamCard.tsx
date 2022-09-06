import { useI18n } from '@solid-primitives/i18n';
import classNames from 'classnames';
import { Icon } from 'solid-heroicons';
import { ellipsisHorizontal, informationCircle } from 'solid-heroicons/solid-mini';
import { createSignal, Match, Switch, VoidComponent } from 'solid-js';

import { Dream } from '~/types';

import { DreamActions } from './DreamActions';
import { DreamInfo } from './DreamInfo';

export type DreamCardProps = {
  dream: Dream;
};

export const DreamCard: VoidComponent<DreamCardProps> = (props) => {
  const [showInfo, setShowInfo] = createSignal(false);
  const [showActions, setShowActions] = createSignal(false);
  const [t] = useI18n();

  let image: HTMLImageElement | undefined;

  return (
    <div role="group" class="card card-compact card-dreamlog bg-base-200 shadow-xl">
      <button class="btn-glass">
        <figure class="figure-dreamlog bg-neutral w-dreamlog-grid-width h-dreamlog-grid-width">
          <img src={props.dream.result} alt={props.dream.settings.prompt} ref={image} />
        </figure>
      </button>
      <div class="w-full justify-stretch">
        <div class="btn-group w-full justify-stretch">
          <button
            class={classNames(
              'btn btn-ghost border-t-base-300 border-r-base-300 gap-4 grow rounded-tl-none',
              {
                'btn-active': showInfo(),
              }
            )}
            onClick={() => setShowInfo((prev) => !prev)}
          >
            <Icon path={informationCircle} class="w-6 h-6" />
            <span>{t('dreamInfo')}</span>
          </button>
          <button
            class={classNames('btn btn-ghost border-t-base-300 grow gap-4 rounded-tr-none', {
              'btn-active': showActions(),
            })}
            onClick={() => setShowActions((prev) => !prev)}
          >
            <span>{t('dreamAction')}</span>
            <Icon path={ellipsisHorizontal} class="w-6 h-6" />
          </button>
        </div>
      </div>
      <Switch>
        <Match when={showActions()}>
          <DreamActions dream={props.dream} set={setShowActions} image={() => image} />
        </Match>
        <Match when={showInfo()}>
          <DreamInfo dream={props.dream} />
        </Match>
      </Switch>
    </div>
  );
};
