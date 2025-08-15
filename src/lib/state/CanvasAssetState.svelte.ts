export class CanvasAssetState {
  path: string;
  id: string;
  filename: string;

  constructor(opts: () => { path: string }) {
    this.path = $derived(opts().path);
    this.id = $derived(parse(this.path).id);
    this.filename = $derived(parse(this.path).filename);
  }
}

function parse(path: string) {
  const [id, ...rest] = path.split('_');
  return {
    id,
    filename: rest.join('_'),
  };
}
