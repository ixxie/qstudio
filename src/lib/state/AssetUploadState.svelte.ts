import { invalidateAll } from '$app/navigation';

import { config } from '$lib/config';
import type { AssetUploadFormValidation } from '$lib/data/asset-upload';

export class AssetUploadState {
  input: HTMLInputElement | null = $state(null);
  selected: FileList | null = $state(null);
  validation: AssetUploadFormValidation = $derived.by(() => {
    // validation messages
    const passed: { message: string; file: File }[] = [];
    const failed: { message: string; file: File }[] = [];
    // validate each file
    for (const file of this?.selected ?? []) {
      // file type validation
      const validExtension = file?.name.toLowerCase().endsWith('.glb');
      const validType = file?.type === 'model/gltf-binary';
      if (!validExtension && !validType) {
        failed.push({
          message: `The file ${file.name} is not a valid GLB files`,
          file,
        });
        continue;
      }
      // file size validation
      if (file?.size > config.upload.maxSize * 1024 * 1024) {
        failed.push({
          message: `File ${file.name} exceeds the ${config.upload.maxSize}MB size limit.`,
          file,
        });
        continue;
      }
      passed.push({
        message: `File ${file.name} validated`,
        file,
      });
    }
    return {
      passed,
      failed,
    };
  });

  constructor() {
    $effect(() => {
      if (this.validation.passed.length > 0) {
        this.#upload();
      }
    });
  }

  async #upload() {
    // build form data with validated files
    const formData = new FormData();
    this.validation.passed.forEach(({ file }) =>
      formData.append('validated', file)
    );
    // post to the asset upload endpoint
    try {
      const response = await fetch('/api/asset', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        await invalidateAll(); // TODO - make this more granular
        console.log('Asset upload successful:', result);
      }
    } catch (error) {
      console.error('Asset upload failed:', error);
    }
  }
}
