<script lang="ts">
  import { T } from '@threlte/core';
  import { Gizmo, Grid, OrbitControls } from '@threlte/extras';
  import { AutoColliders, RigidBody, useRapier } from '@threlte/rapier';

  import Entity from '$lib/components/Entity.svelte';
  import { useApp } from '$lib/hooks/useApp';
  import { useScene } from '$lib/hooks/useScene';

  const app = useApp();
  const scene = useScene();
  const rapier = useRapier();

  rapier.pause();

  $effect(() => {
    if (app.mode.edit) {
      rapier.pause();
    }
    if (app.mode.play) {
      scene.unfocus();
      rapier.resume();
    }
  });
</script>

<!-- entities -->

{#key scene.key}
  {#each scene.tree as data}
    <Entity {data} />
  {/each}
{/key}

<!-- camera -->

<T.PerspectiveCamera makeDefault position={[20, 20, 20]} target={[0, 0, 0]}>
  <OrbitControls enabled={app.mode.edit}>
    <Gizmo type="sphere" placement="bottom-center" offset={{ bottom: 30 }} />
  </OrbitControls>
</T.PerspectiveCamera>

<!-- lights -->

<T.AmbientLight intensity={3} />

<!--floor -->

<Grid
  sectionSize={0}
  cellColor="#eee"
  infiniteGrid
  fadeStrength={3}
  sectionColor="#b01919"
/>

<RigidBody type="fixed">
  <AutoColliders shape="cuboid">
    <T.Mesh position.y={-0.51}>
      <T.BoxGeometry args={[1000, 1, 1000]} />
      <T.MeshStandardMaterial transparent opacity={0} />
    </T.Mesh>
  </AutoColliders>
</RigidBody>
