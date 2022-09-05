import classNames from 'classnames';
import { JSX, ParentComponent, splitProps } from 'solid-js';

export const Drawer: ParentComponent<JSX.IntrinsicElements['div']> = (props) => {
  const [localProps, restProps] = splitProps(props, ['class']);

  return (
    <div
      class={classNames(
        'bg-base-200 w-96 max-w-full h-screen-navbar flex-shrink-0 flex flex-col justify-stretch justify-self-stretch fixed overflow-y-auto overflow-x-hidden lg:relative shadow-xl lg:shadow-none',
        localProps.class
      )}
      {...restProps}
    />
  );
};
