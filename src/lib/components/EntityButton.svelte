<script lang="ts">
  import { useApp } from '$lib/hooks/useApp';

  const { entity } = $props();

  const app = useApp();
</script>

<button
  class="menu-item entity-button row text"
  onclick={() => {
    app.edit();
    entity.focus();
  }}
>
  <span>{entity.data.label}</span>
</button>

<style>
  .entity-button {
    line-height: 1.5rem;
    margin-left: -0.5rem;
    margin-top: 0.3rem;
  }
</style>
