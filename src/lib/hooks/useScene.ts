import { createHook } from '$lib/funcs/hook';
import { useApp } from '$lib/hooks/useApp';
import { SceneState } from '$lib/state/SceneState.svelte';

export const useScene = createHook('scene', SceneState, {
  app: useApp,
});
