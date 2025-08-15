<script lang="ts">
  import { T } from '@threlte/core';

  import { useEntityCube } from '$lib/hooks/useEntityCube';

  const props = $props();
  const { children, interactions, data } = $derived(props);

  const entity = useEntityCube(() => ({ data }));
</script>

{#snippet template()}
  <T.Mesh bind:ref={entity.object} {...interactions(entity)}>
    <T.BoxGeometry />
    <T.MeshStandardMaterial {...entity.data.material} />
  </T.Mesh>
{/snippet}

{@render children({ template, entity })}
