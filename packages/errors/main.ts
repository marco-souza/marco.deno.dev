export function raise(error = "An error occurred"): never {
  throw new Error(error);
}

export function assert(condition: boolean, message = "Assertion failed"): void {
  if (!condition) raise(message);
}
