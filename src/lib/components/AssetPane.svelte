<script lang="ts">
  import AssetButton from '$lib/components/AssetButton.svelte';
  import AssetUploadButton from '$lib/components/AssetUploadButton.svelte';
  import StylePane from '$lib/components/StylePane.svelte';
  import type {
    EntityCubeData,
    EntityGltfData,
    EntitySphereData,
  } from '$lib/data/entity';
  import { initEntity } from '$lib/data/entity';
  import {
    entityCubeIcon,
    entityFileIcon,
    entitySphereIcon,
  } from '$lib/data/icons';
  import { useScene } from '$lib/hooks/useScene';

  const scene = useScene();
</script>

<StylePane classes="edit">
  <section>
    <h2>assets</h2>
  </section>
  <section>
    <h3>shapes</h3>
    <ul>
      <li>
        <AssetButton
          label="cube"
          icon={entityCubeIcon}
          run={() => {
            const cubeObject: EntityCubeData = {
              ...initEntity('cube'),
              material: {
                color: '#ffffff',
                opacity: 1,
                metalness: 0,
                roughness: 1,
                emissiveIntensity: 0,
                transparent: false,
                wireframe: false,
              },
            };
            scene.add<EntityCubeData>(cubeObject);
          }}
        />
      </li>
      <li>
        <AssetButton
          label="sphere"
          icon={entitySphereIcon}
          run={() => {
            const sphereObject: EntitySphereData = {
              ...initEntity('sphere'),
              material: {
                color: '#ffffff',
                opacity: 1,
                metalness: 0,
                roughness: 1,
                emissiveIntensity: 0,
                transparent: false,
                wireframe: false,
              },
            };
            scene.add<EntitySphereData>(sphereObject);
          }}
        />
      </li>
    </ul>
  </section>
  <section>
    <hgroup class="row spaced">
      <h3>models</h3>
      <AssetUploadButton />
    </hgroup>
    {#if scene.assets.length === 0}
      <div class="info">Add models by clicking the + button.</div>
    {:else}
      <ul>
        {#each scene.assets as asset}
          <li>
            <AssetButton
              label={asset.filename}
              icon={entityFileIcon}
              run={() => {
                const gltfObject: EntityGltfData = {
                  path: asset.path,
                  ...initEntity('gltf'),
                };
                scene.add<EntityGltfData>(gltfObject);
              }}
            />
          </li>
        {/each}
      </ul>
    {/if}
  </section>
</StylePane>
