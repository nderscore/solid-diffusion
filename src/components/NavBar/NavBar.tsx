import { useI18n } from '@solid-primitives/i18n';
import classNames from 'classnames';
import { Icon } from 'solid-heroicons';
import { cog_8Tooth } from 'solid-heroicons/solid';
import type { VoidComponent } from 'solid-js';

import { useUiSettingsField } from '~/state/UiSettings';

import { PromptForm } from './PromptForm';
import { QueueButton } from './QueueButton';

export const NavBar: VoidComponent = () => {
  const [t] = useI18n();
  const [settingsOpen, setSettingsOpen] = useUiSettingsField({ field: 'settingsOpen' });

  return (
    <nav class="bg-base-300 p-2 lg:p-4 flex shrink-0 gap-2 lg:gap-4 sticky bottom-0 max-h-screen overflow-y-auto">
      <button
        aria-label={t('settings')}
        class={classNames('btn lg:btn-lg ', { 'btn-ghost': !settingsOpen()() })}
        onClick={() => setSettingsOpen(!settingsOpen()())}
      >
        <Icon path={cog_8Tooth} class="w-4 h-4 lg:w-6 lg:h-6" />
      </button>
      <PromptForm />
      <QueueButton />
    </nav>
  );
};
