import type { EntityCubeData, EntityType } from '$lib/data/entity';
import { EntityState } from '$lib/state/EntityState.svelte';
import type { SceneState } from '$lib/state/SceneState.svelte';

export class EntityCubeState extends EntityState<EntityCubeData> {
  type = 'cube' as EntityType;

  constructor(
    opts: () => {
      data: EntityCubeData;
      scene: SceneState;
    }
  ) {
    const { data, scene } = $derived(opts());
    super(() => ({
      data,
      scene,
    }));
    this.data.label ??= 'Untitled cube';
  }
}
