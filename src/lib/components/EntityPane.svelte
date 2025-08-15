<script lang="ts">
  import ColorPicker from 'svelte-awesome-color-picker';

  import StylePane from '$lib/components/StylePane.svelte';
  import ToolButton from '$lib/components/ToolButton.svelte';
  import { config } from '$lib/config';
  import { actionDeleteIcon } from '$lib/data/icons';
  import { useScene } from '$lib/hooks/useScene';

  const scene = useScene();
</script>

{#if scene.focused}
  <StylePane>
    <section>
      <hgroup class="col start" style="--spacing-y: 0.5rem;">
        <h2>entity</h2>
        <menu class="row spaced full end" style="padding: 0 0.5rem;">
          <label>
            <span>label</span>
            <input
              type="text"
              bind:value={scene.focused.data.label}
              class="grow"
            />
          </label>
          <ToolButton
            label="Delete"
            icon={actionDeleteIcon}
            keycombo="Delete"
            run={() => {
              scene.remove({
                id: scene.focused?.id,
              });
            }}
            active={false}
            position="left"
          />
        </menu>
      </hgroup>
    </section>
    <section>
      <h3>positioning</h3>
      <ul class="wrapped">
        {#each ['position', 'rotation', 'scale'] as param}
          <li>
            <label>
              <span>{param}</span>
              <menu class="row spaced">
                <ToolButton
                  {...scene.focused.tool[
                    {
                      position: 'translate',
                      rotation: 'rotate',
                      scale: 'scale',
                    }[param]
                  ]}
                  position="left"
                />
                <div>
                  <input
                    type="number"
                    bind:value={scene.focused.data.three[param][0]}
                    step={config.precision.default}
                  />
                  <input
                    type="number"
                    bind:value={scene.focused.data.three[param][1]}
                    step={config.precision.default}
                  />
                  <input
                    type="number"
                    bind:value={scene.focused.data.three[param][2]}
                    step={config.precision.default}
                  />
                </div>
              </menu>
            </label>
          </li>
        {/each}
      </ul>
    </section>
    <section>
      <h3>physics</h3>
      <ul class="wrapped">
        {#each ['density', 'friction', 'restitution'] as param}
          <li>
            <label>
              <span>{param}</span>
              <input
                type="number"
                bind:value={scene.focused.data.rapier[param]}
                step={config.precision.default}
              />
            </label>
          </li>
        {/each}
        <li>
          <label>
            <span>collider type</span>
            <select bind:value={scene.focused.data.rapier.shape}>
              <option value="cuboid">Cuboid</option>
              <option value="ball">Ball</option>
              <option value="capsule">Capsule</option>
              <option value="trimesh">Trimesh</option>
              <option value="convexHull">Convex Hull</option>
            </select>
          </label>
        </li>
      </ul>
    </section>
    {#if scene.focused.data.material}
      <section>
        <h3>material</h3>
        <ul class="wrapped">
          <li>
            <label>
              <span>opacity</span>
              <input
                type="number"
                min={0}
                max={1}
                bind:value={scene.focused.data.material.opacity}
                step={config.precision.default}
              />
            </label>
          </li>
          <li>
            <label>
              <span>metalness</span>
              <input
                type="number"
                min={0}
                max={1}
                bind:value={scene.focused.data.material.metalness}
                step={config.precision.default}
              />
            </label>
          </li>
          <li>
            <label>
              <span>roughness</span>
              <input
                type="number"
                min={0}
                max={1}
                bind:value={scene.focused.data.material.roughness}
                step={config.precision.default}
              />
            </label>
          </li>
          <li>
            <label>
              <span>emissive</span>
              <input
                type="number"
                min={0}
                max={10}
                bind:value={scene.focused.data.material.emissiveIntensity}
                step={config.precision.default}
              />
            </label>
          </li>
          <li>
            <label>
              <span>color</span>
              <ColorPicker
                label=""
                hex={scene.focused.data.material.color}
                onInput={({ hex }) => {
                  scene.focused.data.material.color = hex;
                }}
                isDark
                isAlpha={false}
                position="fixed"
                --input-size="12px"
                --picker-z-index="10000"
                --cp-bg-color="transparent"
              />
            </label>
          </li>
          <li>
            <label class="centered">
              <span>transparent</span>
              <input
                type="checkbox"
                bind:checked={scene.focused.data.material.transparent}
              />
            </label>
          </li>
          <li>
            <label class="centered">
              <span>wireframe</span>
              <input
                type="checkbox"
                bind:checked={scene.focused.data.material.wireframe}
              />
            </label>
          </li>
        </ul>
      </section>
    {/if}
    <section>
      <h3>more</h3>
      <p class="info" style="font-size: smaller">
        Copy paste with <i>ctrl+c</i>
        and <i>ctrl+v</i>
      </p>
    </section>
  </StylePane>
{/if}

<style>
  input[type='number'] {
    width: 60px;
  }

  select {
    width: 120px;
    background: transparent;
    border: 1px solid currentColor;
  }

  select option {
    background: transparent;
  }
</style>
