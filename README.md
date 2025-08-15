# qstudio

A response to Qualia's recruitment [challenge](./challenge.pdf).

## Running

The project is setup with `bun` so you need to [install it](https://bun.com/docs/installation) and run `bun dev` to launch the dev server.

# Overview

## UX

- **hud**: a user interface is overlayed on top of the canvas
- **canvas**: is positioned in the background and includes the `<World>` context
- **Scene**: the basic scene setup with light, camera, etc
- **entities**: an element in the scene, dynamically updated

Entities include access to `ThreeJS` and `Rapier` primitives, and talk with the scene state.

## Code organization

`$lib` is organized by file type, e.g. `components` and `hooks`, and the folder hierarchy is kept flat; I've found this to make it easier to navigate and refactor the code. Naming conventions are based on file type and UX concepts are generally followed. I ended up using absolute imports without barrel exports to avoid circular dependency hell. 

## Data flow

```
                                     ╭┄ ┄ ┄ ┄ ┄╮
            defaults ─╮              🭭 	       ╷ 
[load] local storage ─┴─> data ──> hook ┬─> context
                                        ╰─> state ─┬─> component
                                                   ╰─> local storage [save]
```

When objects are first created, defaults are retrieved from `$lib/data`. However, persistence is implemented with hacky `local storage` 'database', so it can be loaded from there as well. The data is then passed into a `hook` which instantiates or retrieves a context with a reactive class-based `state` object. This object can serialize itself into `local storage` storage.

## Commit convention

Squash and run; what's the point of commits when doing this type of rapid prototyping from scratch? Just note that in normal development practice I take care to keep commits as small as I can.

# Self-Evaluation

In all honesty, the amount of tasks seemed like a lot for recruitment challenge; indeed, colleagues from the Threlte team agreed when I described it. But I'm excited about the opportunity, and curious about Rapier, so I decided to see how far I could get. Considering I didn't work much with Rapier before, I'm quite happy with the outcome.

I think I managed to get to a reasonable code quality all things considered.

## Known issues

That's not to say there are no issues with the prototype; here are some which I've identified:

- *Types* - some unresolved type errors and hacks linger in the codebase
- *Object API* - the 'object' abstraction seems to be on the right track to generalize for other shapes, but there are clear rough edges with the API
- *GLTF compression* - in production, I'd use [GLTF Transform](https://gltf-transform.dev/) or something like it to compress assets on upload
- *createHook* - I'm kinda proud of this trick, but the dependency injection was an after-thought and the type safety should be fixed.
- *questionable ECS* - I'm not sure if my entity model is optimal in the long run.
- *Object initialization* - Entities are place at height 0 in the scene, rather than realistically initialized on the floor.


But I'm sure there are a could of more bugs you will spot that I didn't. I *mostly* tested with Firefox (although probably should have done Chrome or Safari statistically speaking, but couldn't be bothered).

## Features

Here is my checklist, based on the assigment itself; I prioritized based on feasibility and value (imo). FWIW I believe drag and drop wouldn't be *that* hard, but I doing the drag controls with a spring for the ragdoll is quite a bit more work.

- [x] **Scene Asset/Object Management UI** - implement a complete CRUD system for managing scene elements:
  - [x] Load local 3D assets
  - [x] Add default Three.js primitives
  - [x] Manage objects
    - [x] GLTFs
    - [x] shapes
      - [x] Cube
      - [x] Sphere
    - [ ] lights
    - [ ] cameras
  - [x] CRUD operations
    - [x] Create
    - [x] Read
    - [x] Update
    - [x] Delete
  - [x] Provide intuitive controls for asset manipulation
    - [x] Position
    - [x] Rotation
    - [x] Scale
- [x] **Scene Tree Hierarchy UI**
  - [x] Display a hierarchical view of all scene elements (lights,
        cameras, assets, etc.)
  - [x] Take inspiration from theater while implementing creative
        layout and visual design
  - [x] Provide clear organization and navigation of scene components
- [x] **Property Editor UI** - Create an interface for modifying component properties,
      including:
  - [x] Position and orientation
  - [x] Material properties
  - [x] Other relevant object attributes
  - [ ] Illumination settings
- [x] **Rapier Physics Integration**: implement core Rapier physics functionalities:
  - [x] Collision detection systems
  - [x] Rigid body physics simulation
  - [x] Proper physics material assignment
- [x] **Interactive Drag Doll Simulation** - provide a "Run" mode that enables:
  - [x] Real-time physics interactions
  - [x] Object collision and response when dragged into proximity
  - [ ] Mouse-based object manipulation during simulation
- [ ] **Drag and Drop Functionality**
  - [ ] Enable drag-and-drop interaction for assets from a management menu
  - [ ] Ensure smooth asset placement within the 3D scene
- [ ] **Bonus: Advanced Joint Systems** - implement joint constraints for multi-limb objects (e.g., robot assets), ensuring kinematic constraint compliance:
  - [ ] Limbs should respect maximum extension limits
  - [ ] Models should maintain structural integrity when constraints are reached
  - [ ] Prevent model breakage during extreme manipulations


# Thoughts

## Threlte needs less components but better plugins

Since most the Threlte APIs are currently components, it gets a bit hard to work with systems that overlay with the ThreeJS canvas like the Rapier physics engine. You need to use bindings and snippet props to hook into state, and it ain't always pretty.

I've started to think maybe we need more of these core functionality of the `@threlte/rapier` package to come from hooks and especially Threlte plugins. But I think we need some upgrades to the core design the plugin system, even going towards some kind of ECS model for Threlte.

I've started a discussion of this limitation with Michael Parks; Michael is a Threlte core team member, works for a robotics company and has been working on with and on the Rapier API a lot in the last years. He agreed this sounds promising, but needs to explore the performance hit of some of the changes to the plugin system.


## What if the future is less 'Blender' and more 'Claude' or even 'Starcraft'

While its intuitive to build studio-like UIs for doing this sort of thing, I wonder if the emphasis should be different.

Consideer the following:
- Generative 3D models are developing rapidly
- There are ways of trasforming BIM models and AutoCad schematics to GLTFs
- One can imagine a simple feature to allow turning an SVG into a floor plan

The extreme version is a multiagentic framework where the agents are literally running around the scene building stuff for you. And as you want to train robots for more scenarios, I imagine one very important aspect is safety, so you will want to simulate humans and other animals as well as other robots.

## You will likely benefit from `@threlte/rapier` just for deterministic physics

Grischa implemented an excellent [scheduler]() to `@threlte/core`, and one of the motivations for this was [physics determinism for `@threlte/rapier` package while allowing for varying framerate](https://threlte.xyz/docs/reference/rapier/framerate). There is even [`usePhysicsTask`](https://threlte.xyz/docs/reference/rapier/use-physics-task) to specifically execute in a `simulation` stage before the physics world is stepped.

Since `<World>` + `useRapier` let you already access the underlying Rapier instance, it should at least in theory be doable to incrementally migrate to `@threlte/rapier`, especially if we work with the Threlte team to improve the API to your needs.

## I wonder if Qualia considers the possibility of inference as well as training time functionality

I can imagine the system might double as a digital twin for an operating robot? This could be big in property management and industrial applications.


## I can imagine interesting consumer spinoffs of the kind of product you are building

Not just for user-friendly VLA for domestic robots, but also in with digital twin based social / game features to play with.

