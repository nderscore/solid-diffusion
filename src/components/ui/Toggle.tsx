import classNames from 'classnames';
import type { JSX, VoidComponent } from 'solid-js';

export type ToggleProps = {
  class?: string;
  label: string;
  name: string;
  value: boolean;
  set: (next: boolean) => void;
};

export const Toggle: VoidComponent<ToggleProps> = (props) => {
  const onChange: JSX.EventHandler<HTMLInputElement, Event> = (e) =>
    props.set(e.currentTarget.checked);

  return (
    <div class="form-control">
      <label class="label" for={props.name}>
        <span class="label-text">{props.label}</span>
        <input
          checked={props.value}
          class={classNames('toggle', props.class)}
          type="checkbox"
          name={props.name}
          onChange={onChange}
        />
      </label>
    </div>
  );
};
