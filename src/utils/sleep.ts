const sleep = <T extends any>(delay: number, resolveValue?: T): Promise<T> =>
  new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setTimeout(() => resolve(resolveValue), delay);
  });

export default sleep;
