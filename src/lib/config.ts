export const config = {
  app: {
    name: 'qstudio',
  },
  upload: {
    path: 'assets',
    maxSize: 40, // MB
  },
  id: {
    length: 16,
    salt: 'foobarbaz',
  },
  precision: {
    default: 0.01,
  },
};
