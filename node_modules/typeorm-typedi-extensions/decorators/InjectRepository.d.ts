/**
 * Satisfy typescript compiler about universal decorators.
 */
export declare type ParamOrPropDecorator = (object: object, propertyName: string, index?: number) => void;
/**
 * Allows to inject a custom repository using TypeDI's Container.
 * Be aware that you have to annotate the param/property  with correct type!
 * ```ts
 * class Sample {
 *   // constructor injection
 *   constructor(
 *     \@InjectRepository()
 *      private userRepository: UserRepository,
 *   ) {}
 *
 *   // property injection
 *  \@InjectRepository()
 *   userRepository: UserRepository;
 * }
 * ```
 */
export declare function InjectRepository(): ParamOrPropDecorator;
/**
 * Allows to inject a Repository, MongoRepository, TreeRepository using TypeDI's Container.
 * Be aware that you have to annotate the param/property  with correct type!
 * ```ts
 * class Sample {
 *   // constructor injection
 *   constructor(
 *     \@InjectRepository(User)
 *      private userRepository: Repository<User>,
 *   ) {}
 *
 *   // property injection
 *  \@InjectRepository(User)
 *   userRepository: Repository<User>;
 * }
 * ```
 */
export declare function InjectRepository(entityType: Function): ParamOrPropDecorator;
/**
 * Allows to inject a custom repository using TypeDI's Container
 * and specify the connection name in a parameter.
 * Be aware that you have to annotate the param/property  with correct type!
 * ```ts
 * class Sample {
 *   // constructor injection
 *   constructor(
 *     \@InjectRepository("test-conn")
 *      private userRepository: UserRepository,
 *   ) {}
 *
 *   // property injection
 *  \@InjectRepository("test-conn")
 *   userRepository: UserRepository;
 * }
 * ```
 */
export declare function InjectRepository(connectionName: string): ParamOrPropDecorator;
/**
 * Allows to inject a Repository, MongoRepository, TreeRepository using TypeDI's Container
 * and specify the connection name in a parameter.
 * Be aware that you have to annotate the param/property with correct type!
 * ```ts
 * class Sample {
 *   // constructor injection
 *   constructor(
 *     \@InjectRepository(User, "test-conn")
 *      private userRepository: Repository<User>,
 *   ) {}
 *
 *   // property injection
 *  \@InjectRepository(User, "test-conn")
 *   userRepository: Repository<User>;
 * }
 * ```
 */
export declare function InjectRepository(entityType: Function, connectionName: string): ParamOrPropDecorator;
