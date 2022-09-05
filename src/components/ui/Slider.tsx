import classNames from 'classnames';
import { createMemo, JSX, VoidComponent } from 'solid-js';

export type SliderProps = {
  class?: string;
  label: string;
  max: number;
  min: number;
  name: string;
  percentage?: boolean;
  step?: number;
  warn?: boolean;
  value: number;
  set: (next: number) => void;
};

export const Slider: VoidComponent<SliderProps> = (props) => {
  const onInput: JSX.EventHandler<HTMLInputElement, Event> = (e) => {
    const decimalStep = props.step ?? 1 < 1;
    const inputValue = e.currentTarget.value;
    if (props.percentage) {
      props.set(parseInt(inputValue) / 100);
    } else {
      props.set((decimalStep ? parseFloat : parseInt)(inputValue));
    }
  };
  const value = createMemo(() => {
    if (props.percentage) {
      return Math.round(props.value * 100);
    }
    return props.value;
  });

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
          value={value()}
          onInput={onInput}
          style={
            props.warn
              ? {
                  '--range-shdw': 'var(--wa)',
                }
              : undefined
          }
        />
        <div class="w-16 text-center">
          {value()}
          {props.percentage && '%'}
        </div>
      </div>
    </div>
  );
};
