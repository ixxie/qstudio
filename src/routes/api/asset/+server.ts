import { Buffer } from 'node:buffer';
import { readdir, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

import { config } from '$lib/config';
import { genId } from '$lib/funcs/id';

export const POST: RequestHandler = async ({ request }) => {
  const formData = await request.formData();
  const files = formData.getAll('validated') as File[]; // TODO: typesafety
  if (files.length === 0) {
    return json(
      {
        error: 'No files provided',
      },
      { status: 400 }
    );
  } else {
    const paths = await Promise.all(
      files.map(async (file: File) => {
        const path = join(config.upload.path, `${genId()}_${file?.name}`);
        await writeFile(path, Buffer.from(await file?.arrayBuffer()));
        return path;
      })
    );
    return json({
      success: true,
      paths,
    });
  }
};

export const GET: RequestHandler = async () => {
  const paths = await readdir(config.upload.path);
  return json({
    paths,
  });
};
