import { createHook } from '$lib/funcs/hook';
import { useScene } from '$lib/hooks/useScene';
import { EntitySphereState } from '$lib/state/EntitySphereState.svelte';

export const useEntitySphere = createHook('entity-sphere', EntitySphereState, {
  scene: useScene,
});
