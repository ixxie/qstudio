import { getContext, hasContext, setContext } from 'svelte';

import { config } from '$lib/config';

type Constructor = new (...args: any[]) => any;

export const createHook =
  <T extends Constructor>(
    key: string, // context key
    state: T, // state constructor
    deps?: {
      [hook: string]: Function;
    }
  ) =>
  (
    // forward constructor args
    rawOpts?: Partial<ConstructorParameters<T>[0]>
  ): InstanceType<T> => {
    // setup context
    let context: InstanceType<T>;
    const ctxKey = `${config.app.name}-${key}`;
    if (!hasContext(ctxKey)) {
      // initialize dependency hooks
      const inject = () =>
        Object.fromEntries(
          Object.entries(deps ?? {}).map(([name, hook]) => [name, hook()])
        );
      // construct dependency injection
      let injectedOpts;
      if (!rawOpts) {
        // return only deps
        injectedOpts = inject();
      } else if (rawOpts instanceof Function) {
        // inject into function
        injectedOpts = () => ({
          ...inject(),
          ...rawOpts(),
        });
      } else {
        // inject into data
        injectedOpts = {
          ...inject(),
          ...rawOpts,
        };
      }
      // create new state
      context = new state(injectedOpts);
      setContext(ctxKey, context);
    } else {
      context = getContext<InstanceType<T>>(ctxKey);
    }
    return context;
  };
