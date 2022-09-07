import { useI18n } from '@solid-primitives/i18n';
import { createMemo, Show, VoidComponent } from 'solid-js';

import { scrollbarBaseColors } from '~/constants';
import { Dream } from '~/types';

export type DreamInfoProps = {
  dream: Dream;
};

const mapRealEsrganValueToLanguageKey = (val: 2 | 4) => {
  if (val == 2) {
    return 'x2scale';
  }
  return 'x4scale';
};

export const DreamInfo: VoidComponent<DreamInfoProps> = (props) => {
  const [t] = useI18n();

  const formattedTimestamp = createMemo(() =>
    t('timestampFormatted', {
      date: props.dream.date.toLocaleDateString(),
      time: props.dream.date.toLocaleTimeString(),
    })
  );
  const realEsrganBadgeCopy = createMemo(
    () =>
      `RealESRGAN ${t(
        mapRealEsrganValueToLanguageKey(props.dream.settings.upscale_level)
      )}: ${Math.round(props.dream.settings.upscale_strength * 100)}%`
  );
  const gfpganBadgeCopy = createMemo(
    () => `GFPGAN: ${Math.round(props.dream.settings.gfpgan_strength * 100)}%`
  );

  return (
    <div class="flex flex-col absolute top-0 w-dreamlog-grid-width h-dreamlog-grid-width">
      <div class="card-body bg-base-300 bg-opacity-90 flex flex-row justify-between">
        <time datetime={props.dream.date.toISOString()}>{formattedTimestamp()}</time>
        <div class="flex flex-col gap-2 items-end">
          <Show when={props.dream.settings.upscale_enabled}>
            <div class="badge">{realEsrganBadgeCopy()}</div>
          </Show>
          <Show when={props.dream.settings.gfpgan_enabled}>
            <div class="badge">{gfpganBadgeCopy()}</div>
          </Show>
        </div>
      </div>
      <div
        class={`overflow-auto card-body grow bg-base-300 bg-opacity-90 prose scrollbar-thin ${scrollbarBaseColors}`}
      >
        <h3>{props.dream.settings.prompt}</h3>
        <ul>
          <li>
            <strong>{t('seed')}</strong>
            {': '}
            {props.dream.settings.seed}
          </li>
          <li>
            <strong>{t('cfgScaleShort')}</strong>
            {': '}
            {props.dream.settings.cfgscale}
          </li>
          <li>
            <strong>{t('sampler')}</strong>
            {': '}
            {props.dream.settings.sampler}
          </li>
          <li>
            <strong>{t('steps')}</strong>
            {': '}
            {props.dream.settings.steps}
          </li>
        </ul>
      </div>
    </div>
  );
};
