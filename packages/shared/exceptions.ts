const makeDefaultError = (message: string) => new Error(message);

export const raise = (message: string, makeError = makeDefaultError): never => {
  throw makeError(message);
};
