import { ClassType } from "../interfaces";
import { UnionFromClasses } from "../helpers/utils";
import { ResolveTypeOptions } from "./types";
export interface UnionTypeConfig<TClassTypes extends ClassType[]> extends ResolveTypeOptions<UnionFromClasses<TClassTypes>> {
    name: string;
    description?: string;
    types: TClassTypes;
}
export declare function createUnionType<T extends ClassType[]>(config: UnionTypeConfig<T>): UnionFromClasses<T>;
