import classNames from 'classnames';
import type { JSX } from 'solid-js';

import { DreamSettingsAtomType } from '~/state/DreamSettings';

export type DreamSliderProps<K extends keyof DreamSettingsAtomType> = {
  class?: string;
  field: K;
  label: string;
  name: string;
  value: number;
  set: (next: number) => void;
};

export const DreamSlider = <K extends keyof DreamSettingsAtomType>(props: DreamSliderProps<K>) => {
  const onInput: JSX.EventHandler<HTMLInputElement, Event> = (e) =>
    props.set(parseInt(e.currentTarget.value));

  return (
    <div class="form-control">
      <label class="label" for={props.name}>
        <span class="label-text">{props.label}</span>
      </label>
      <div class="flex gap-3">
        <input
          class={classNames('range', props.class)}
          type="range"
          max={1024}
          min={64}
          name={props.name}
          step={64}
          value={props.value}
          onInput={onInput}
        />
        <div class="w-10 text-center">{props.value}</div>
      </div>
    </div>
  );
};
