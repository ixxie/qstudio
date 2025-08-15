import { createHook } from '$lib/funcs/hook';
import { AppState } from '$lib/state/AppState.svelte';

export const useApp = createHook('app', AppState);
