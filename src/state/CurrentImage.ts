import { createAtom } from '@reatom/core';
import { createBooleanAtom } from '@reatom/core/primitives';

import { imageElementToBlob } from '~/util/imageElementToBlob';

export const currentImageDataValidDimension = createBooleanAtom(true);

export const currentImageDataAtom = createAtom(
  {
    reset: () => {},
    set: (next: string) => next,
  },
  ({ onAction }, state = null as string | null) => {
    onAction('reset', () => (state = null));
    onAction('set', (next) => (state = next));
    return state;
  }
);

const setImageFromBlob = (blob: Blob) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    const result = reader.result;
    if (typeof result == 'string') {
      currentImageDataAtom.set.dispatch(result);
    }
  });
  reader.readAsDataURL(blob);
};

export const setImageFromImageElement = async (img: HTMLImageElement) => {
  const blob = await imageElementToBlob(img);
  if (blob) {
    setImageFromBlob(blob);
  }
};

export const setImageFromFileInput = (input: HTMLInputElement) => {
  const file = input.files?.[0];
  if (!file) {
    return;
  }
  return setImageFromBlob(file);
};

export const resetImageData = () => currentImageDataAtom.reset.dispatch();
