<script lang="ts">
  import { tooltip } from '$lib/attachments/tooltip';
  import StyleIcon from '$lib/components/StyleIcon.svelte';
  import type { HudToolSpec } from '$lib/data/hud-tool';
  import { useKeybinding } from '$lib/hooks/useKeybinding';

  const { label, icon, run, keycombo, keyhint, active, position }: HudToolSpec =
    $props();

  const keybinding = keycombo ? useKeybinding(keycombo, run) : () => {};
</script>

<svelte:body onkeydown={keybinding} />

<button
  class="text"
  onclick={(event: MouseEvent) => {
    event.stopPropagation();
    run();
  }}
  aria-label={label}
  {@attach tooltip(
    `
		<div style="text-align: center">
			<b>${label}</b><br/>
			<i>(${keycombo ?? keyhint})</i>
		</div>
	`,
    {
      position: (position as 'top' | 'bottom' | 'left' | 'right') ?? 'top',
      gap: 20,
    }
  )}
  class:active={active ?? true}
>
  <StyleIcon --icon={icon} />
</button>

<style>
  button {
    position: relative;
    z-index: 1000;
    margin: 0;
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }
</style>
