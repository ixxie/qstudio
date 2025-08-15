<script lang="ts">
  import { T } from '@threlte/core';
  import { useGltf } from '@threlte/extras';

  import { useEntityGltf } from '$lib/hooks/useEntityGltf';

  const props = $props();
  const { children, interactions, data } = $derived(props);

  const entity = useEntityGltf(() => ({ data }));

  const gltf = useGltf(`/api/asset/${entity.id}/${entity.asset.path}`);
</script>

{#snippet template()}
  {#await gltf then { scene }}
    <T bind:ref={entity.object} is={scene} {...interactions(entity)} />
  {/await}
{/snippet}

{@render children({ template, entity })}
