<script lang="ts">
  import StyleIcon from '$lib/components/StyleIcon.svelte';
  import { useApp } from '$lib/hooks/useApp';

  const { run, icon, label } = $props();

  const app = useApp();
</script>

<button
  class="menu-item asset-menu-item row text"
  onclick={() => {
    app.edit();
    run();
  }}
>
  <StyleIcon --icon={`url('${icon}')`} />
  <span>
    {label}
  </span>
</button>
