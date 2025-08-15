import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { RequestHandler } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

import { config } from '$lib/config';

export const GET: RequestHandler = async ({ params }) => {
  if (!params.file) {
    throw error(400, 'File parameter is required');
  }

  const path = join(config.upload.path, params.file);

  try {
    const file = await readFile(path);

    return new Response(new Uint8Array(file), {
      headers: {
        'Content-Type': 'model/gltf-binary',
        'Content-Disposition': `inline; filename="${params.file}"`,
      },
    });
  } catch (err) {
    throw error(404, 'File not found');
  }
};
