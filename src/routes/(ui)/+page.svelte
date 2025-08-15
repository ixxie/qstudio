<script lang="ts">
  import Canvas from '$lib/components/Canvas.svelte';
  import Hud from '$lib/components/Hud.svelte';
  import { useApp } from '$lib/hooks/useApp';
  import { useKeybinding } from '$lib/hooks/useKeybinding';
  import { useScene } from '$lib/hooks/useScene';

  import type { PageProps } from './$types';

  const { data }: PageProps = $props();

  const app = useApp();
  const scene = useScene({
    data: {
      id: 'default',
      assets: [],
    },
    app,
  });

  $effect(() => {
    scene.data.assets = data.paths;
  });

  // Copy-paste keybindings
  const copyEntity = useKeybinding('ctrl+c', () => {
    scene.copy();
  });

  const pasteEntity = useKeybinding('ctrl+v', () => {
    scene.paste();
  });
</script>

<svelte:body
  onkeydown={(e) => {
    copyEntity(e);
    pasteEntity(e);
  }}
/>

<main>
  <Hud
    --edit={app.mode.edit ? 'block' : 'none'}
    --play={app.mode.play ? 'block' : 'none'}
    --debug={app.mode.debug ? 'block' : 'none'}
  />
  <Canvas />
</main>

<style>
  main {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
  }
</style>
