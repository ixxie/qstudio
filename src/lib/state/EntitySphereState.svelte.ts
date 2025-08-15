import type { EntitySphereData, EntityType } from '$lib/data/entity';
import { EntityState } from '$lib/state/EntityState.svelte';
import type { SceneState } from '$lib/state/SceneState.svelte';

export class EntitySphereState extends EntityState<EntitySphereData> {
  type = 'sphere' as EntityType;

  constructor(
    opts: () => {
      data: EntitySphereData;
      scene: SceneState;
    }
  ) {
    const { data, scene } = $derived(opts());
    super(() => ({
      data,
      scene,
    }));
    this.data.label ??= 'Untitled Sphere';
  }
}
