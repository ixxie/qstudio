import type { EntityGltfData, EntityType } from '$lib/data/entity';
import { CanvasAssetState } from '$lib/state/CanvasAssetState.svelte';
import { EntityState } from '$lib/state/EntityState.svelte';
import type { SceneState } from '$lib/state/SceneState.svelte';

export class EntityGltfState extends EntityState<EntityGltfData> {
  type = 'gltf' as EntityType;
  asset: CanvasAssetState;

  constructor(
    opts: () => {
      data: EntityGltfData;
      scene: SceneState;
    }
  ) {
    const { data, scene } = $derived(opts());
    super(() => ({
      data,
      scene,
    }));
    this.asset = new CanvasAssetState(() => ({ path: data.path }));
    this.data.label ??= this.asset.filename
      .replaceAll('_', ' ')
      .replace('.glb', '');
  }
}
