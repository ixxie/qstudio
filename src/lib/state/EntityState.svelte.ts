import * as rapier from '@dimforge/rapier3d-compat';
import * as three from 'three';
import * as three_addons from 'three/examples/jsm/Addons.js';

import type { EntityData, EntityType } from '$lib/data/entity';
import type { HudToolSpec } from '$lib/data/hud-tool';
import {
  transformRotateIcon,
  transformScaleIcon,
  transformTranslateIcon,
} from '$lib/data/icons';
import { queryLocalDb } from '$lib/funcs/local';
import type { SceneState } from '$lib/state/SceneState.svelte';

export abstract class EntityState<T extends EntityData> {
  // static
  abstract type: EntityType;
  data: T;
  // reactive
  parent: string | null = $state(null);
  mode: three_addons.TransformControlsMode | null = $state(null);
  object: three.Object3D | undefined = $state();
  body: rapier.RigidBody | undefined = $state();
  collider: any | null = $state(null); // TODO - fix type
  // references
  scene: SceneState;
  focused: boolean;
  initialized: boolean = $state(false);
  #previousShape: string | null = $state(null);

  constructor(opts: () => { data: T; scene: SceneState }) {
    this.data = $derived(opts().data);
    this.scene = $derived(opts().scene);
    this.#previousShape = this.data.rapier.shape;

    // register this entity with the scene
    this.scene.register(this as EntityState<EntityData>);

    this.focused = $derived(this.scene.focused?.id === this.id);

    $effect(() => {
      // update data in local storage as needed
      queryLocalDb('default', ({ db, commit }) => {
        db.entities = db.entities.map((prev: EntityData) =>
          // replace data for this object
          prev.id === this.id ? this.data : prev
        );
        commit(db);
      });
    });

    $effect(() => {
      // initialize position
      if (!this.initialized && this.object) {
        // reset three params
        this.object.position.set(...this.data.three.position);
        this.object.rotation.set(...this.data.three.rotation);
        this.object.scale.set(...this.data.three.scale);
        // refresh the collider
        this.collider?.refresh();
        // declare initialized
        this.initialized = true;
      }
    });

    $effect(() => {
      this.object?.position.set(...this.data.three.position);
    });

    $effect(() => {
      this.object?.rotation.set(...this.data.three.rotation);
    });

    $effect(() => {
      this.object?.scale.set(...this.data.three.scale);
    });

    $effect(() => {
      // refresh collider when shape changes
      const currentShape = this.data.rapier.shape;
      if (
        currentShape !== this.#previousShape &&
        this.collider &&
        this.initialized
      ) {
        this.#previousShape = currentShape;
        this.collider.refresh();
      }
    });
  }

  get id() {
    return this.data.id;
  }

  // focus

  focus() {
    this.scene.focus(this);
  }

  unfocus() {
    if (this.focused) {
      this.scene.unfocus();
      this.mode = null;
    }
  }

  toggle() {
    if (this.focused) {
      this.unfocus();
    } else {
      this.focus();
    }
  }

  // tools

  transform(mode: three_addons.TransformControlsMode) {
    this.focus();
    this.mode = mode;
  }

  get tools(): HudToolSpec[] {
    return [
      {
        label: 'Translate',
        icon: transformTranslateIcon,
        run: () => this.transform('translate'),
        keycombo: 'shift+t',
        active: this.mode === 'translate',
      },
      {
        label: 'Rotate',
        icon: transformRotateIcon,
        run: () => this.transform('rotate'),
        keycombo: 'shift+r',
        active: this.mode === 'rotate',
      },
      {
        label: 'Scale',
        icon: transformScaleIcon,
        run: () => this.transform('scale'),
        keycombo: 'shift+s',
        active: this.mode === 'scale',
      },
    ];
  }

  get tool(): { [tool: string]: HudToolSpec } {
    return Object.fromEntries(
      this.tools.map((tool: HudToolSpec) => [tool.label.toLowerCase(), tool])
    );
  }
}
