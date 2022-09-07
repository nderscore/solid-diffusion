import { useI18n } from '@solid-primitives/i18n';
import { useAtom } from 'reatom-solid';
import { Show, VoidComponent } from 'solid-js';

import { CollapsibleFieldgroup } from '~/components/ui/CollapsibleFieldgroup';
import { currentImageDataAtom, currentImageDataValidDimension } from '~/state/CurrentImage';
import { useUiSettingsField } from '~/state/UiSettings';

import { ClearImageInputButton } from './ClearImageInputButton';
import { DenoisingStrengthField } from './DenoisingStrengthField';
import { ImageInputOpenButton } from './ImageInputOpenButton';
import { ImageInputPreview } from './ImageInputPreview';
import { ResizetoFitField } from './ResizeToFitField';

export const ImageInputFields: VoidComponent = () => {
  const [t] = useI18n();
  const [open, setOpen] = useUiSettingsField('imageInputFieldsOpen');
  const [validDimensions] = useAtom(currentImageDataValidDimension);
  const [currentImage] = useAtom(currentImageDataAtom);

  return (
    <CollapsibleFieldgroup
      label={t('settingsGroupImageInput')}
      open={open()}
      onClick={() => setOpen(!open())}
      id="settings-image-input"
    >
      <div class="flex gap-4 items-stretch">
        <ImageInputPreview />
        <div class="grow flex flex-col gap-2">
          <Show when={currentImage()} fallback={<ImageInputOpenButton />}>
            <ClearImageInputButton />
          </Show>
        </div>
      </div>
      <Show when={currentImage()}>
        <DenoisingStrengthField />
        <Show when={!validDimensions()}>
          <ResizetoFitField />
        </Show>
      </Show>
    </CollapsibleFieldgroup>
  );
};
