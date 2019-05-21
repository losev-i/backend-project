import "reflect-metadata";
import { Entity, Column, BaseEntity, ObjectID, ObjectIdColumn } from "typeorm";
import { ObjectType, Field, Root } from "type-graphql";

/**
 * Entity class
 * Defines the structure of User objects
 */
@ObjectType()
@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
  id!: ObjectID;

  @Field()
  @Column()
  firstName!: string;

  @Field()
  @Column()
  lastName!: string;

  @Field()
  @Column("text", { unique: true })
  email!: string;

  @Field()
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Column()
  password!: string;
}
