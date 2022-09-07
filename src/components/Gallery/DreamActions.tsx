import { useI18n } from '@solid-primitives/i18n';
import { useAction } from 'reatom-solid';
import { Icon } from 'solid-heroicons';
import {
  arrowLeft,
  arrowLeftOnRectangle,
  arrowUpOnSquare,
  chatBubbleLeftEllipsis,
  clipboardDocument,
  eyeSlash,
  photo,
} from 'solid-heroicons/solid-mini';
import { Accessor, VoidComponent } from 'solid-js';

import { setImageFromImageElement } from '~/state/CurrentImage';
import { forgetDream } from '~/state/DreamLog';
import { dreamSettingsAtom } from '~/state/DreamSettings';
import { Dream } from '~/types';
import { imageElementToBlob } from '~/util/imageElementToBlob';

export type DreamActionsProps = {
  dream: Dream;
  image: Accessor<HTMLImageElement | undefined>;
  set: (next: boolean) => void;
};

export const DreamActions: VoidComponent<DreamActionsProps> = (props) => {
  const [t] = useI18n();
  const updateSettings = useAction(dreamSettingsAtom.update);
  const selfClose = () => props.set(false);
  const checkClipboardPermission = async () => {
    const { state } = await navigator.permissions.query({
      name: 'clipboard-write' as PermissionName,
    });
    return state === 'granted';
  };

  const reproduceImage = () => {
    const { ...restSettings } = props.dream.settings;
    restSettings.random = false;
    updateSettings(restSettings);
    selfClose();
  };

  const reproduceSettings = () => {
    const { initimg: _i, prompt: _p, ...restSettings } = props.dream.settings;
    restSettings.random = false;
    updateSettings(restSettings);
    selfClose();
  };

  const copySettings = async () => {
    if (!(await checkClipboardPermission())) {
      return;
    }
    const { initimg: _i, ...restSettings } = props.dream.settings;
    restSettings.random = false;
    await navigator.clipboard.writeText(JSON.stringify(restSettings, null, 2));
    selfClose();
  };

  const copyPrompt = async () => {
    if (!(await checkClipboardPermission())) {
      return;
    }
    await navigator.clipboard.writeText(props.dream.settings.prompt);
    selfClose();
  };

  const copyImage = async () => {
    const image = props.image();
    if (!image || !(await checkClipboardPermission())) {
      return;
    }
    const blob = await imageElementToBlob(image);
    if (!blob) {
      return;
    }
    await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
    selfClose();
  };

  const forget = () => {
    forgetDream(props.dream.id);
  };

  return (
    <div class="flex flex-col card-body bg-base-200 bg-opacity-90 absolute top-0 w-dreamlog-grid-width h-dreamlog-grid-width">
      <div class="card-actions flex flex-col justify-end h-full">
        <button class="btn btn-error self-center lg:mb-4 flex gap-4" onClick={forget}>
          <Icon path={eyeSlash} class="w-6 h-6" />
          <span>{t('dreamForget')}</span>
        </button>
        <button class="btn self-stretch flex justify-between gap-4" onClick={reproduceImage}>
          <Icon path={arrowUpOnSquare} class="w-6 h-6" />
          <span>{t('reproduceImage')}</span>
        </button>
        <button class="btn self-stretch flex justify-between gap-4" onClick={reproduceSettings}>
          <Icon path={arrowLeft} class="w-6 h-6" />
          <span>{t('reuseSettings')}</span>
        </button>
        <button
          class="btn self-stretch justify-between"
          onClick={() => {
            const image = props.image();
            if (image) {
              setImageFromImageElement(image);
              selfClose();
            }
          }}
        >
          <Icon path={arrowLeftOnRectangle} class="w-6 h-6" />
          <span>{t('useImageAsInput')}</span>
        </button>
        <button class="btn self-stretch flex justify-between gap-4" onClick={copySettings}>
          <Icon path={clipboardDocument} class="w-6 h-6" />
          <span>{t('copySettings')}</span>
        </button>
        <div class="btn-group self-stretch">
          <button
            class="btn flex justify-between gap-4 grow border-r-2 border-r-base-200"
            onClick={copyPrompt}
          >
            <Icon path={chatBubbleLeftEllipsis} class="w-6 h-6" />
            <span>{t('copyPrompt')}</span>
          </button>
          <button class="btn flex justify-between gap-4 grow" onClick={copyImage}>
            <span> {t('copyImage')}</span>
            <Icon path={photo} class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
