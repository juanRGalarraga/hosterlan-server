import { Field, Int, ObjectType } from '@nestjs/graphql';

export function Paginated<T>(classRef: any) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [classRef])
    items: T[];

    @Field(() => Int)
    total: number;

    @Field(() => Int)
    page: number;

    @Field(() => Int)
    limit: number;

    @Field(() => Int)
    totalPages: number;
  }

  return PaginatedType;
}