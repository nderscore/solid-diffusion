import classNames from 'classnames';
import { JSX, ParentComponent, splitProps } from 'solid-js';

import { scrollbarBaseColors } from '~/constants';

export const Drawer: ParentComponent<JSX.IntrinsicElements['div']> = (props) => {
  const [localProps, restProps] = splitProps(props, ['class']);

  return (
    <div
      class={classNames(
        'bg-base-200',
        'w-96 max-w-full h-screen-navbar flex-shrink-0 justify-self-stretch',
        'fixed lg:relative',
        'flex flex-col justify-stretch',
        'shadow-xl lg:shadow-none',
        'overflow-x-hidden overflow-y-auto scrollbar-thin lg:scrollbar',
        scrollbarBaseColors,
        localProps.class
      )}
      {...restProps}
    />
  );
};
