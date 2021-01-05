export const flushPromises = () => new Promise(setImmediate);

export const sleep = (milliseconds: number) =>
  new Promise(resolve => setTimeout(resolve, milliseconds));
