import { browser } from '$app/environment';

import type { EntityData } from '$lib/data/entity';

const emptyDb: {
  entities: EntityData[];
} = {
  entities: [],
};

export const queryLocalDb = (
  key: string,
  query: ({
    db,
    commit,
  }: {
    db: typeof emptyDb;
    commit: (db: typeof emptyDb) => void;
  }) => any
) => {
  if (!browser) {
    return;
  }
  // init if needed
  if (!(key in localStorage)) {
    localStorage.setItem(key, JSON.stringify(emptyDb));
  }
  // attempt read
  const rawJson = localStorage.getItem(key);
  if (!rawJson) {
    throw Error(`Could not find database with key ${key}`);
  }
  // setup commit hook
  const commit = (db: {}) => {
    localStorage.setItem(key, JSON.stringify(db));
  };
  try {
    // execute query
    const db = JSON.parse(rawJson);
    return query({ db, commit });
  } catch (error) {
    throw Error(`Failed to parse db with key ${key}: ${error}`);
  }
};
