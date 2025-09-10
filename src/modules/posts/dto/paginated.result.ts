import { ObjectType } from '@nestjs/graphql';
import { Post } from '@app/database/schemas/posts.schema';
import { Paginated } from '@app/common/dto/paginated.result';

@ObjectType()
export class PaginatedPosts extends Paginated(Post) {}