<script lang="ts">
  import ToolButton from '$lib/components/ToolButton.svelte';
  import { modeDesignIcon, modeEditIcon, modePlayIcon } from '$lib/data/icons';
  import { useApp } from '$lib/hooks/useApp';
  import { useKeybinding } from '$lib/hooks/useKeybinding';

  const app = useApp();

  const toggleEdit = useKeybinding('space', () => {
    app.toggle();
  });
</script>

<svelte:body onkeydown={toggleEdit} />

<menu class="row spaced" style="padding: 0">
  {#key app.mode.edit}
    <ToolButton
      label="Debug"
      run={() => {
        app.debug();
      }}
      keycombo="shift+d"
      active={app.mode.debug}
      icon={modeEditIcon}
      position="bottom"
    />
    <ToolButton
      label="Play"
      run={() => {
        app.play();
      }}
      keyhint="space"
      active={app.mode.play}
      icon={modePlayIcon}
      position="bottom"
    />
    <ToolButton
      label="Edit"
      run={() => {
        app.edit();
      }}
      keyhint="space"
      active={app.mode.edit}
      icon={modeDesignIcon}
      position="bottom"
    />
  {/key}
</menu>
