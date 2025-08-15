import { createHook } from '$lib/funcs/hook';
import { useScene } from '$lib/hooks/useScene';
import { EntityCubeState } from '$lib/state/EntityCubeState.svelte';

export const useEntityCube = createHook('entity-cube', EntityCubeState, {
  scene: useScene,
});
