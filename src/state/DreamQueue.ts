import { createAtom } from '@reatom/core';
import { createEnumAtom, createNumberAtom } from '@reatom/core/primitives';
import debounce from 'lodash/debounce';
import { v4 as uuidv4 } from 'uuid';

import { endpoints } from '~/constants';
import { DreamSettings } from '~/types';
import { mapDreamSettingsToPostBody } from '~/util/mapDreamSettingsToPostBody';
import { randomSeed } from '~/util/randomSeed';

import { currentImageDataAtom } from './CurrentImage';
import { logDream } from './DreamLog';
import { dreamSettingsAtom } from './DreamSettings';

export type DreamJob = {
  id: string;
  settings: DreamSettings;
};

export type JobEventType = 'cancelled' | 'step' | 'result' | 'upscaling-started' | 'upscaling-done';

export type ServerMessage = {
  event: JobEventType;
  url?: string;
  step?: number;
};

const dreamStatuses = ['empty', 'dreaming', 'postprocessing', 'error'] as const;

export type DreamJobStatus = typeof dreamStatuses[number];

const textDecoder = new TextDecoder();

export const dreamStatusAtom = createEnumAtom(dreamStatuses);
export const dreamStepAtom = createNumberAtom(-1);
export const dreamTotalStepAtom = createNumberAtom(50);

export const dreamJobAtom = createAtom(
  { set: (next: DreamJob | null) => next },
  ({ onAction, schedule }, state = null as DreamJob | null) => {
    onAction('set', (next) => (state = next));
    schedule(async () => {
      if (!state) {
        return;
      }

      dreamStatusAtom.setDreaming.dispatch();
      dreamStepAtom.set.dispatch(0);
      dreamTotalStepAtom.set.dispatch(state.settings.steps);

      const response = await fetch(endpoints.dream, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mapDreamSettingsToPostBody(state.settings)),
      });

      if (!response.body) {
        throw new Error('Missing POST response body.');
      }

      let imageUrl: string | null = null;
      const reader = response.body.getReader();
      let endLoop = false;
      while (!endLoop) {
        const { done, value } = await reader.read();

        const text = textDecoder.decode(value);
        const messages = text
          .split('\n')
          .filter(Boolean)
          .map((s) => JSON.parse(s) as ServerMessage);

        for (const message of messages) {
          switch (message.event) {
            case 'step':
              if (message.step) {
                dreamStepAtom.set.dispatch(message.step);
              }
              break;
            case 'cancelled':
              // TODO
              break;
            case 'upscaling-started':
              dreamStatusAtom.setPostprocessing.dispatch();
              break;
            case 'upscaling-done':
              // do nothing?
              break;
            case 'result':
              if (message.url) {
                imageUrl = message.url;
              }
              break;
          }
        }

        if (done) {
          endLoop = true;
        }
      }

      if (imageUrl) {
        logDream(state, imageUrl);
      }

      dreamJobAtom.set.dispatch(null);
      dreamQueueAtom.squeduleNextJob.dispatch();
    });
    return state;
  }
);

export const dreamQueueAtom = createAtom(
  {
    enqueue: (job: DreamJob) => job,
    remove: (job: DreamJob) => job,
    squeduleNextJob: () => {},
  },
  ({ onAction }, state = [] as DreamJob[]) => {
    onAction('enqueue', (job) => {
      if (dreamJobAtom.getState() !== null) {
        state = [...state, job];
      } else {
        dreamJobAtom.set.dispatch(job);
      }
    });
    onAction('remove', (job) => {
      state = state.filter((j) => j.id !== job.id);
    });
    onAction('squeduleNextJob', () => {
      if (dreamJobAtom.getState() !== null) {
        throw new Error("Can't schedule a job when one is in progress");
      }
      const [next, ...rest] = state;
      state = rest;
      if (next) {
        dreamJobAtom.set.dispatch(next);
      } else {
        dreamStatusAtom.setEmpty.dispatch();
      }
    });
    return state;
  }
);

export const queueDream = debounce(() => {
  const settings = dreamSettingsAtom.getState();
  if (settings.prompt === '') {
    // TODO: show an error/warning when this happens
    return;
  }
  const seed = settings.random ? randomSeed() : settings.seed || randomSeed();
  const initimg = currentImageDataAtom.getState();
  dreamQueueAtom.enqueue.dispatch({
    id: uuidv4(),
    settings: {
      ...settings,
      initimg,
      seed,
    },
  });
}, 100);
