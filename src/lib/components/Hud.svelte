<script lang="ts">
  import AssetPane from '$lib/components/AssetPane.svelte';
  import EntityPane from '$lib/components/EntityPane.svelte';
  import ModeToolbar from '$lib/components/ModeToolbar.svelte';
  import ScenePane from '$lib/components/ScenePane.svelte';
  import { useScene } from '$lib/hooks/useScene';

  const scene = useScene();
</script>

<menu id="hud-top" class="hud row spaced">
  <ModeToolbar />
</menu>

<menu id="hud-left" class="hud hud-sidebar">
  <ScenePane />
</menu>

<menu id="hud-right" class="hud hud-sidebar">
  {#if scene.focused}
    <EntityPane />
  {:else}
    <AssetPane />
  {/if}
</menu>

<span id="hud-bottom-right" class="hud col end" style="opacity: 0.5">
  <b>QSTUDIO</b>
  <i>© Matan Bendix Shenhav 2025</i>
</span>

<style>
  .hud {
    z-index: 100;
    position: fixed;
  }

  #hud-top {
    top: var(--spacing-y);
    width: fit-content;
    right: 50vw;

    -webkit-transform: translateX(50%);
    -moz-transform: translateX(50%);
    -ms-transform: translateX(50%);
    transform: translateX(50%);
  }

  .hud-sidebar {
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;
    width: 350px;
    top: var(--spacing-y);
    bottom: var(--spacing-y);
    padding: 0;
  }

  #hud-left {
    left: var(--spacing-x);
  }

  #hud-right {
    right: var(--spacing-x);
  }

  #hud-bottom-right {
    bottom: var(--spacing-y);
    right: var(--spacing-x);
  }
</style>
