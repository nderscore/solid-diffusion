import classNames from 'classnames';
import type { JSX } from 'solid-js';
import { For } from 'solid-js';

export type SelectOption = {
  label?: string;
  value: string;
};

export type SelectProps<T extends string> = {
  class?: string;
  label: string;
  name: string;
  options: SelectOption[];
  value: T;
  set: (next: T) => void;
};

export const Select = <T extends string = string>(props: SelectProps<T>) => {
  const onChange: JSX.EventHandler<HTMLSelectElement, Event> = (e) =>
    props.set(e.currentTarget.value as T);

  return (
    <div class="form-control">
      <label class="label" for={props.name}>
        <span class="label-text">{props.label}</span>
      </label>
      <select class={classNames('select', props.class)} name={props.name} onChange={onChange}>
        <For each={props.options}>
          {(option) => (
            <option value={option.value} selected={option.value === props.value}>
              {option.label ?? option.value}
            </option>
          )}
        </For>
      </select>
    </div>
  );
};
