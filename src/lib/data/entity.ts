import { genId } from '$lib/funcs/id';

// core

export type EntityType = 'cube' | 'gltf' | 'sphere';

// data - for serializing the object's state

export interface EntityData {
  id: string;
  sceneId: string;
  label?: string;
  type: EntityType;
  three: EntityThreeData;
  rapier: EntityRapierData;
}

export interface EntityThreeData {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

export interface EntityRapierData {
  friction: number;
  restitution: number;
  density: number;
  shape: 'cuboid' | 'ball' | 'capsule' | 'trimesh' | 'convexHull';
}

// gltf object (with path)

export interface EntityGltfData extends EntityData {
  path: string;
}

// shape objects (with material)

export interface EntityMaterialData {
  color: string;
  opacity: number;
  metalness: number;
  roughness: number;
  emissiveIntensity: number;
  transparent: boolean;
  wireframe: boolean;
}

export interface EntityCubeData extends EntityData {
  material: EntityMaterialData;
}

export interface EntitySphereData extends EntityData {
  material: EntityMaterialData;
}

// defaults

export const initEntity = (type: EntityType): EntityData => ({
  id: genId(),
  type,
  sceneId: 'default',
  three: {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  rapier: {
    friction: 1,
    restitution: 0.05,
    density: 1,
    shape: 'convexHull',
  },
});
