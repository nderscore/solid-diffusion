import { useI18n } from '@solid-primitives/i18n';
import classNames from 'classnames';
import { useAtom } from 'reatom-solid';
import { JSX, Show, VoidComponent } from 'solid-js';

import { currentImageDataAtom, currentImageDataValidDimension } from '~/state/CurrentImage';
import { useDreamSettingsField } from '~/state/DreamSettings';

const validateDimension = (size: number) => {
  if (size < 64 || size > 1024) {
    return false;
  }
  if (size % 64 !== 0) {
    return false;
  }
  return true;
};

export const ImageInputPreview: VoidComponent = () => {
  const [t] = useI18n();
  const [, setWidth] = useDreamSettingsField('width');
  const [, setHeight] = useDreamSettingsField('height');
  const [currentImage] = useAtom(currentImageDataAtom);
  const [validDimension] = useAtom(currentImageDataValidDimension);

  const onLoad: JSX.EventHandler<HTMLImageElement, Event> = (e) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    if ([naturalWidth, naturalHeight].every(validateDimension)) {
      setWidth(naturalWidth);
      setHeight(naturalHeight);
      currentImageDataValidDimension.setTrue.dispatch();
    } else {
      currentImageDataValidDimension.setFalse.dispatch();
    }
  };

  return (
    <div
      class={classNames(
        'w-48 h-48 bg-neutral text-neutral-content checkerboard-neutral border-2 rounded overflow-hidden flex justify-center items-center select-none',
        !currentImage() || validDimension() ? 'border-base-200' : 'border-warning'
      )}
    >
      <Show when={currentImage()} fallback={t('noImage')} keyed>
        {(imgSrc) => (
          <img src={imgSrc} class="object-contain max-w-full max-h-full" onLoad={onLoad} />
        )}
      </Show>
    </div>
  );
};
