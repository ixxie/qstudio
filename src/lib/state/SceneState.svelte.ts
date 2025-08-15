import type { EntityData } from '$lib/data/entity';
import type { SceneData } from '$lib/data/scene';
import { genId } from '$lib/funcs/id';
import { queryLocalDb } from '$lib/funcs/local';
import type { AppState } from '$lib/state/AppState.svelte';
import { CanvasAssetState } from '$lib/state/CanvasAssetState.svelte';
import type { EntityState } from '$lib/state/EntityState.svelte';

export class SceneState {
  data: SceneData;
  app: AppState;
  #assets: CanvasAssetState[];
  #tree: EntityData[] = $state([]);
  #entities: EntityState<EntityData>[] = $state([]);
  #clipboard: string | null = $state(null);
  focused: EntityState<EntityData> | null = $state(null);
  #key: number = $state(1);

  constructor({ data, app }: { data: SceneData; app: AppState }) {
    this.data = $state(data);
    this.app = app;
    this.#assets = $derived(
      this.data.assets.map(
        (path: string) => new CanvasAssetState(() => ({ path }))
      )
    );

    this.load();

    $effect(() => {
      if (this.app.mode.play) {
        this.unfocus();
      } else if (this.app.mode.edit) {
        this.refresh();
      }
    });
  }

  refresh() {
    this.#key = Math.random();
  }

  get key() {
    return this.#key;
  }

  // focus

  focus(target: EntityState<EntityData>) {
    if (this.app.mode.play) {
      return;
    }
    this.focused = target;
  }

  unfocus() {
    this.focused = null;
  }

  // assets

  get assets() {
    return this.#assets;
  }

  // tree (data)

  get tree() {
    return this.#tree;
  }

  // entities (state instances)

  get entities() {
    return this.#entities;
  }

  register(entity: EntityState<EntityData>) {
    if (!this.#entities.find((e) => e.id === entity.id)) {
      this.#entities.push(entity);
    }
  }

  unregister(id: string) {
    this.#entities = this.#entities.filter((e) => e.id !== id);
  }

  add<T extends EntityData>(data: T) {
    queryLocalDb('default', ({ db, commit }) => {
      db.entities.push(data);
      commit(db);
    });
    this.load();
  }

  remove({ id }: { id: string }) {
    this.unfocus();
    // Then remove from persistent storage
    queryLocalDb('default', ({ db, commit }) => {
      db.entities = db.entities.filter((e) => e.id !== id);
      commit(db);
    });
    this.unregister(id);
    this.load();
  }

  // copy-paste functionality

  copy() {
    if (this.focused) {
      // Convert the reactive data to a plain object before cloning
      this.#clipboard = JSON.stringify(this.focused.data);
    }
  }

  paste() {
    if (this.#clipboard) {
      const pastedData = JSON.parse(this.#clipboard);
      // Generate new ID and offset position slightly
      pastedData.id = genId();
      pastedData.three.position[0] += 1;
      pastedData.three.position[2] += 1;
      this.add(pastedData);
    }
  }

  load() {
    const result = queryLocalDb('default', ({ db }) => db.entities);
    if (result) {
      this.#tree = result;
      this.refresh();
    }
  }
}
