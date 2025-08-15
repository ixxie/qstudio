import { config } from '$lib/config';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  const response = await fetch('/api/asset', { method: 'GET' });
  const { paths } = await response.json();
  return { paths };
};
