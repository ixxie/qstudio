<script lang="ts">
  import { T } from '@threlte/core';
  import {
    Billboard,
    HTML,
    interactivity,
    TransformControls,
  } from '@threlte/extras';
  import { AutoColliders, RigidBody } from '@threlte/rapier';
  import type { Component, Snippet } from 'svelte';

  import EntityCube from '$lib/components/EntityCube.svelte';
  import EntityGltf from '$lib/components/EntityGltf.svelte';
  import EntitySphere from '$lib/components/EntitySphere.svelte';
  import { config } from '$lib/config';
  import type { EntityData, EntityType } from '$lib/data/entity';
  import { EntityState } from '$lib/state/EntityState.svelte';

  const { data }: { data: EntityData } = $props();

  const components: {
    [key in EntityType]: Component;
  } = {
    cube: EntityCube,
    gltf: EntityGltf,
    sphere: EntitySphere,
  };

  const ObjectComponent = components[data.type];

  interactivity();
</script>

<ObjectComponent
  {data}
  interactions={(entity: EntityState<EntityData>) => ({
    onpointerup: (event: MouseEvent) => {
      event.stopPropagation();
      entity.toggle();
    },
    onpointermissed: () => {
      entity.unfocus();
    },
  })}
>
  {#snippet children({
    template,
    entity,
  }: {
    template: Snippet;
    entity: EntityState<EntityData>;
  })}
    <RigidBody bind:rigidBody={entity.body} type="dynamic">
      <AutoColliders bind:this={entity.collider} {...entity.data?.rapier}>
        {@render template()}
      </AutoColliders>
    </RigidBody>
    {#if entity.focused}
      <!-- object info -->
      <Billboard position={entity.data.three.position}>
        <HTML>
          <div class="label">
            <b>{entity.data.label}</b>
          </div>
        </HTML>
      </Billboard>
      <!-- controls -->
      {#if entity.mode && entity.object !== undefined}
        <TransformControls
          object={entity.object}
          mode={entity.mode}
          onobjectChange={() => {
            if (!entity.object) {
              return;
            }
            entity.data.three.position = entity.object.position.toArray();
            entity.data.three.rotation = [
              entity.object.rotation.x,
              entity.object.rotation.y,
              entity.object.rotation.z,
            ];
            entity.data.three.scale = entity.object.scale.toArray();
            entity.collider?.refresh();
          }}
          renderOrder={500}
          translationSnap={config.precision.default}
        />
      {/if}
    {/if}
  {/snippet}
</ObjectComponent>

<style>
  :root {
    --v-offset: 120px;
  }

  .label {
    text-align: center;
    pointer-events: none;

    /* text */
    max-width: 200px;
    overflow: clip;
    text-overflow: ellipsis;
    white-space: nowrap;

    /* positioning */
    -webkit-transform: translateX(-50%) translateY(var(--v-offset));
    -moz-transform: translateX(-50%) translateY(var(--v-offset));
    -ms-transform: translateX(-50%) translateY(var(--v-offset));
    transform: translateX(-50%) translateY(var(--v-offset));
  }
</style>
