import { createAtom } from '@reatom/core';
import debounce from 'lodash/debounce';

export const createLocalStorageAtom = <T>(storageKey: string, defaultValue: T) => {
  const isObject = typeof defaultValue === 'object';

  const readStorage = () => {
    try {
      // TODO: validation?
      // allow try-catch to handle bad null assertion
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return JSON.parse(localStorage.getItem(storageKey)!) as T;
    } catch (_e) {
      return defaultValue;
    }
  };

  const saveStorage = debounce((state: T) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (_e) {
      // handle error?
    }
  }, 100);

  const initialValue = isObject
    ? {
        ...defaultValue,
        ...readStorage(),
      }
    : readStorage();

  const atom = createAtom(
    {
      update: (next: T | Partial<T>) => next,
      reset: () => {},
    },
    ({ onAction, onInit, schedule }, state = initialValue) => {
      onInit(() => {
        window.addEventListener('storage', ({ key, storageArea }) => {
          if (storageArea === localStorage && key === storageKey) {
            atom.update.dispatch(readStorage());
          }
        });
      });
      if (isObject) {
        onAction('update', (next) => (state = { ...state, ...next }));
        onAction('reset', () => (state = { ...defaultValue }));
      } else {
        onAction('update', (next) => (state = next as T));
        onAction('reset', () => (state = defaultValue));
      }
      schedule(() => saveStorage(state));
      return state;
    }
  );

  return atom;
};
