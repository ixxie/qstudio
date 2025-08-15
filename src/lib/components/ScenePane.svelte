<script lang="ts">
  import EntityButton from '$lib/components/EntityButton.svelte';
  import StylePane from '$lib/components/StylePane.svelte';
  import { useApp } from '$lib/hooks/useApp';
  import { useScene } from '$lib/hooks/useScene';

  const scene = useScene();
</script>

<StylePane classes="edit">
  <section>
    <hgroup class="row spaced">
      <h2>scene</h2>
    </hgroup>
  </section>
  <section>
    {#if scene.entities.length === 0}
      <div class="info">Add elements to your scene by selecting assets.</div>
    {:else}
      <ul class="tree">
        {#each scene.entities as entity}
          <li class="row">
            <div class="node"></div>
            <EntityButton {entity} />
          </li>
        {/each}
      </ul>
    {/if}
  </section>
</StylePane>

<style>
  .tree {
    padding-top: 0.5rem;
    padding-left: 0;
  }

  li .node {
    font-size: 1.5rem;
  }

  li:not(:last-child) .node::before {
    content: '├─';
  }
  li:last-child .node::before {
    content: '╰─';
  }
</style>
