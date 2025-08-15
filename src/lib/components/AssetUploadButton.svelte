<script lang="ts">
  import { tooltip } from '$lib/attachments/tooltip';
  import StyleIcon from '$lib/components/StyleIcon.svelte';
  import { actionAddIcon } from '$lib/data/icons';
  import { useAssetUpload } from '$lib/hooks/useAssetUpload';

  const upload = useAssetUpload();
</script>

<input
  bind:this={upload.input}
  bind:files={upload.selected}
  name="selected"
  type="file"
  multiple
  accept=".glb,model/gltf-binary"
/>
<button
  onclick={() => {
    upload.input?.click();
  }}
  class="text"
  {@attach tooltip('Upload GLB model', { position: 'left' })}
>
  <StyleIcon
    --icon={actionAddIcon}
    --icon-size="1.1rem"
  />
</button>

<style>
  input {
    display: none;
  }

  button {
    margin: 0;
  }
</style>
