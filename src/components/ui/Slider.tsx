import classNames from 'classnames';
import type { JSX, VoidComponent } from 'solid-js';

export type SliderProps = {
  class?: string;
  label: string;
  max: number;
  min: number;
  step?: number;
  name: string;
  value: number;
  set: (next: number) => void;
};

export const Slider: VoidComponent<SliderProps> = (props) => {
  const onInput: JSX.EventHandler<HTMLInputElement, Event> = (e) =>
    props.set((props.step ?? 1 < 1 ? parseFloat : parseInt)(e.currentTarget.value));

  return (
    <div class="form-control">
      <label class="label" for={props.name}>
        <span class="label-text">{props.label}</span>
      </label>
      <div class="flex gap-3">
        <input
          class={classNames('range', props.class)}
          type="range"
          max={props.max}
          min={props.min}
          name={props.name}
          step={props.step}
          value={props.value}
          onInput={onInput}
        />
        <div class="w-16 text-center">{props.value}</div>
      </div>
    </div>
  );
};
