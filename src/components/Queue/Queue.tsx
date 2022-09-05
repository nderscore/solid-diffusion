import type { VoidComponent } from 'solid-js';
import { Show } from 'solid-js';

import { Drawer } from '~/components/ui/Drawer';
import { useUiSettingsField } from '~/state/UiSettings';

export const Queue: VoidComponent = () => {
  const [queueOpen] = useUiSettingsField({ field: 'queueOpen' });

  return (
    <Show when={queueOpen()()}>
      <Drawer class="right-0 z-20">TODO: Visualize and manage queue</Drawer>
    </Show>
  );
};
