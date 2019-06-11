import { schema } from 'normalizr';

/**
 * Interface for classes providing a schema to describe
 * entity relations and id attribute.
 */
export interface Schemable {
  /**
   * The schema that represents relations and meta information of this entity
   */
  schema: schema.Entity;
}
