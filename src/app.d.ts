import type { UserCatalogue } from '@threlte/core';
import type { DragControls } from 'three/addons/controls/DragControls.js';

declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
  namespace Threlte {
    interface UserCatalogue {
      DragControls: DragControls;
    }
  }
}

export {};
