import classNames from 'classnames';
import { Icon } from 'solid-heroicons';
import { chevronDoubleDown } from 'solid-heroicons/solid-mini';
import { JSX, ParentComponent, splitProps } from 'solid-js';
import { Show } from 'solid-js';

export type CollapsibleFieldgroupProps = JSX.IntrinsicElements['div'] & {
  label: string;
  id: string;
  open: boolean;
  onClick: JSX.EventHandler<HTMLButtonElement, MouseEvent>;
};

export const CollapsibleFieldgroup: ParentComponent<CollapsibleFieldgroupProps> = (props) => {
  const [localProps, restProps] = splitProps(props, [
    'class',
    'children',
    'id',
    'label',
    'open',
    'onClick',
  ]);

  return (
    <div role="group" aria-label={localProps.label}>
      <button
        aria-controls={localProps.id}
        aria-expanded={localProps.open}
        class="btn btn-ghost btn-fieldgroup border-t-base-100 border-b-base-300 m-px mb-0 rounded-none justify-between w-full"
        onClick={(e) => localProps.onClick(e)}
      >
        <span>{localProps.label}</span>
        <Icon
          path={chevronDoubleDown}
          class={classNames('w-4 h-4', { '-rotate-90': !localProps.open })}
        />
      </button>
      <div
        class={classNames(
          'flex flex-col gap-4 bg-base-300',
          { 'p-4': localProps.open },
          localProps.class
        )}
        id={localProps.id}
        role="region"
        {...restProps}
      >
        <Show when={localProps.open}>{localProps.children}</Show>
      </div>
    </div>
  );
};
