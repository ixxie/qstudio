import { createHook } from '$lib/funcs/hook';
import { useScene } from '$lib/hooks/useScene';
import { EntityGltfState } from '$lib/state/EntityGltfState.svelte';

export const useEntityGltf = createHook('entity-gltf', EntityGltfState, {
  scene: useScene,
});
