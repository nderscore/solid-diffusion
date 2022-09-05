import { useI18n } from '@solid-primitives/i18n';
import type { JSX, VoidComponent } from 'solid-js';

import { useDreamSettingsField } from '~/state/DreamSettings';

/**
 * https://iconoir.com
 * @license MIT - Copyright (c) 2021 Luca Burgio
 */
const DiceIcon: VoidComponent = () => (
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor"
  >
    <path
      d="M3 20.4V3.6a.6.6 0 01.6-.6h16.8a.6.6 0 01.6.6v16.8a.6.6 0 01-.6.6H3.6a.6.6 0 01-.6-.6z"
      stroke="currentColor"
      stroke-width="1.5"
    />
    <path
      d="M7.5 8a.5.5 0 110-1 .5.5 0 010 1zM16.5 8a.5.5 0 110-1 .5.5 0 010 1zM7.5 12.5a.5.5 0 110-1 .5.5 0 010 1zM16.5 12.5a.5.5 0 110-1 .5.5 0 010 1zM7.5 17a.5.5 0 110-1 .5.5 0 010 1zM16.5 17a.5.5 0 110-1 .5.5 0 010 1z"
      fill="currentColor"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const SeedField: VoidComponent = () => {
  const [t] = useI18n();
  const [seed, setSeed] = useDreamSettingsField('seed');
  const [randomize, setRandomize] = useDreamSettingsField('random');

  const onInput: JSX.EventHandler<HTMLInputElement, Event> = (e) => {
    const value = parseInt(e.currentTarget.value);
    setSeed(Number.isNaN(value) ? 0 : value);
  };

  const onCheckboxChange: JSX.EventHandler<HTMLInputElement, Event> = (e) => {
    setRandomize(e.currentTarget.checked);
  };

  return (
    <div class="form-control">
      <label class="label" for="seed">
        <span class="label-text">{t('seed')}</span>
      </label>
      <div class="flex gap-4">
        <input
          class="input flex-grow"
          disabled={randomize()}
          max={0xffffffff}
          min={0}
          type={randomize() ? 'text' : 'number'}
          value={randomize() ? t('randomize') : seed()}
          onInput={onInput}
        />
        <label
          class="flex gap-4 justify-self-stretch items-center cursor-pointer"
          aria-label={t('randomize')}
        >
          <input
            class="checkbox grow"
            checked={randomize()}
            name="random"
            onChange={onCheckboxChange}
            type="checkbox"
          />
          <DiceIcon />
        </label>
      </div>
    </div>
  );
};
