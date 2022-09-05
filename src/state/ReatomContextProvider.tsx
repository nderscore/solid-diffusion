import { createStore } from '@reatom/core';
import { reatomContext } from 'reatom-solid';
import { ParentComponent } from 'solid-js';

const { Provider } = reatomContext;

export const ReatomContextProvider: ParentComponent = (props) => {
  const store = createStore();

  return <Provider value={store}>{props.children}</Provider>;
};
