import { createAtom } from '@reatom/core';
import { createBooleanAtom } from '@reatom/core/primitives';
import { DBSchema, openDB } from 'idb';

import { Dream } from '~/types';

import { DreamJob } from './DreamQueue';

// TODO: use postMessage to send db update event to other windows?

const DB_VERSION = 1;

const DB_KEY = 'solid-diffusion';

const DREAMS_STORE_KEY = 'dreams';

export interface DreamDB extends DBSchema {
  dreams: {
    key: string;
    value: Dream;
    indexes: {
      'by-date': Date;
    };
  };
}

export const dreamsLoadedAtom = createBooleanAtom(false);

const db = openDB<DreamDB>(DB_KEY, DB_VERSION, {
  upgrade(db, _oldVersion, _newVersion, _transaction) {
    const dreamsStore = db.createObjectStore(DREAMS_STORE_KEY, {
      keyPath: 'id',
    });
    dreamsStore.createIndex('by-date', 'date');
    // TODO: index more fields?
  },
});

const addDBDream = async (dream: Dream) => {
  return (await db).add(DREAMS_STORE_KEY, dream);
};

const removeDBDream = async (id: string) => {
  return (await db).delete(DREAMS_STORE_KEY, id);
};

const getAllDBDream = async () => {
  const results = await (await db).getAll(DREAMS_STORE_KEY);
  results.sort((a, b) => b.date.getTime() - a.date.getTime());
  return results;
};

export const dreamLogAtom = createAtom(
  {
    add: (dream: Dream) => dream,
    replaceList: (next: Dream[]) => next,
    remove: (id: string) => id,
  },
  ({ onAction, onInit }, state = [] as Dream[]) => {
    // load initial dream log from database on init
    onInit(async () => {
      const loadedDreams = await getAllDBDream();
      dreamLogAtom.replaceList.dispatch(loadedDreams);
      dreamsLoadedAtom.set.dispatch(true);
    });
    // receive dreams from initial db load
    onAction('replaceList', (next: Dream[]) => {
      state = next;
    });
    onAction('add', (dream) => {
      state = [dream, ...state];
      // sync to db
      addDBDream(dream);
    });
    onAction('remove', (id) => {
      state = state.filter(({ id: i }) => id !== i);
      // sync to db
      removeDBDream(id);
    });
    // TODO: method to clear all logged dreams from db and state
    return state;
  }
);

export const logDream = (job: DreamJob, result: string) => {
  const date = new Date();
  const dream: Dream = {
    ...job,
    date,
    result,
  };
  dreamLogAtom.add.dispatch(dream);
};

export const forgetDream = (id: string) => {
  dreamLogAtom.remove.dispatch(id);
};
