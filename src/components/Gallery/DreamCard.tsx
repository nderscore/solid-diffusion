import { useI18n } from '@solid-primitives/i18n';
import classNames from 'classnames';
import { Icon } from 'solid-heroicons';
import { ellipsisHorizontal, informationCircle } from 'solid-heroicons/solid-mini';
import { createSignal, Match, Show, Switch, VoidComponent } from 'solid-js';

import { Dream } from '~/types';

import { DreamActions } from './DreamActions';
import { DreamInfo } from './DreamInfo';

export type DreamCardProps = {
  dream: Dream;
};

export const DreamCard: VoidComponent<DreamCardProps> = (props) => {
  const [showModalImage, setShowModalImage] = createSignal(false);
  const [showInfo, setShowInfo] = createSignal(false);
  const [showActions, setShowActions] = createSignal(false);
  const [t] = useI18n();

  let image: HTMLImageElement | undefined;

  return (
    <div role="group" class="card card-compact card-dreamlog bg-base-200 shadow-xl">
      <button class="btn-glass" onClick={() => setShowModalImage(true)}>
        <figure class="figure-dreamlog bg-neutral checkerboard-neutral w-dreamlog-grid-width h-dreamlog-grid-width">
          <img
            src={props.dream.result}
            alt={props.dream.settings.prompt}
            ref={image}
            class="shadow-sm"
          />
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
      <Show when={showModalImage()}>
        <div
          class="bg-neutral checkerboard-neutral fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50"
          onClick={() => setShowModalImage(false)}
        >
          <img
            src={props.dream.result}
            alt={props.dream.settings.prompt}
            ref={image}
            class="shadow-lg max-h-full max-w-full object-contain"
          />
        </div>
      </Show>
    </div>
  );
};
