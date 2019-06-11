/**
 * Decorator function for decorating classes that should
 * implement static members.
 */
export function staticImplements<T>() {
  return (constructor: T) => {};
}
