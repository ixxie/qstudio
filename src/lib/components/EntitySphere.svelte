<script lang="ts">
  import { T } from '@threlte/core';

  import { useEntitySphere } from '$lib/hooks/useEntitySphere';

  const props = $props();
  const { children, interactions, data } = $derived(props);

  const entity = useEntitySphere(() => ({ data }));
</script>

{#snippet template()}
  <T.Mesh bind:ref={entity.object} {...interactions(entity)}>
    <T.SphereGeometry />
    <T.MeshStandardMaterial {...entity.data.material} />
  </T.Mesh>
{/snippet}

{@render children({ template, entity })}
