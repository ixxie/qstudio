import { createHook } from '$lib/funcs/hook';
import { AssetUploadState } from '$lib/state/AssetUploadState.svelte';

export const useAssetUpload = createHook(
  'hud-asset-upload-button',
  AssetUploadState
);
