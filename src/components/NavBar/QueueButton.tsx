import { useI18n } from '@solid-primitives/i18n';
import classNames from 'classnames';
import { useAtom } from 'reatom-solid';
import { Icon } from 'solid-heroicons';
import { cloud, exclamationTriangle, inbox } from 'solid-heroicons/solid';
import { Match, Show, Switch, VoidComponent } from 'solid-js';

import {
  dreamQueueAtom,
  dreamStatusAtom,
  dreamStepAtom,
  dreamTotalStepAtom,
} from '~/state/DreamQueue';
import { useUiSettingsField } from '~/state/UiSettings';

export const QueueButton: VoidComponent = () => {
  const [t] = useI18n();
  const [queueOpen, setQueueOpen] = useUiSettingsField({ field: 'queueOpen' });
  const [status] = useAtom(dreamStatusAtom);
  const [step] = useAtom(dreamStepAtom);
  const [totalSteps] = useAtom(dreamTotalStepAtom);
  const [queue] = useAtom(dreamQueueAtom);

  return (
    <button
      aria-label={t('queue')}
      class={classNames('btn lg:btn-lg relative', {
        'btn-ghost': !queueOpen()(),
      })}
      onClick={() => setQueueOpen(!queueOpen()())}
    >
      <Switch>
        <Match when={'empty' === status()}>
          <Icon path={inbox} class="w-4 h-4 lg:w-6 lg:h-6" />
        </Match>
        <Match when={['dreaming', 'postprocessing'].includes(status())}>
          <Icon path={cloud} class="w-4 h-4 lg:w-6 lg:h-6" />
        </Match>
        <Match when={'error' === status()}>
          <Icon path={exclamationTriangle} class="w-4 h-4 lg:w-6 lg:h-6" />
        </Match>
      </Switch>
      <Show when={['dreaming', 'postprocessing'].includes(status())}>
        <div
          class={classNames(
            'dream-progress-indicator',
            status() === 'dreaming' ? 'bg-accent' : 'bg-secondary'
          )}
          style={{ '--progress-step': step(), '--progress-step-total': totalSteps() }}
        />
      </Show>
      <Show when={queue().length > 0}>
        <div class="badge badge-secondary absolute top-0 right-0">{`+${queue().length}`}</div>
      </Show>
    </button>
  );
};
