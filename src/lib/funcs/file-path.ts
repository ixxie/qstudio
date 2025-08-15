export const parseFilepath = (path: string) => {
  const [uuid, ...rest] = path.split('_');
  const name = rest.join('_');
  return { name, uuid, path };
};
