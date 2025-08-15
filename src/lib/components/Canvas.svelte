<script lang="ts">
  import { Canvas } from '@threlte/core';
  import { PerfMonitor } from '@threlte/extras';
  import { Debug, World } from '@threlte/rapier';

  import Scene from '$lib/components/Scene.svelte';
  import { useApp } from '$lib/hooks/useApp';

  // init context
  const app = useApp();
</script>

<div class="canvas-container">
  <Canvas>
    <World>
      <Scene />
      {#if app.mode.debug}
        <Debug />
        <PerfMonitor scale={0.9} anchorX="left" anchorY="bottom" />
      {/if}
    </World>
  </Canvas>
</div>

<style>
  .canvas-container {
    z-index: -1;
    width: 100%;
    height: 100%;
  }

  :global(#three-perf-ui) {
    margin-left: var(--spacing-x);
    margin-bottom: var(--spacing-y);
  }
</style>
