import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from '@app/database/schemas/posts.schema';
import { PaginationInput } from '@app/common/dto/pagination.input';
import { PaginatedPosts } from './dto/paginated.result';
import { UserService } from '../user/user.service';
import { User } from '@app/database/schemas/users.schema';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly userService: UserService,
  ) { }
  
  // @ResolveField(() => User)
  // async user(@Parent() post: Post) {
  //   return this.userService.findOne(post.user);
  // }

  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postsService.create(createPostInput);
  }

  @Query(() => PaginatedPosts, { name: 'posts' })
  async findAll(
    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination: PaginationInput = { page: 1, limit: 10 },
  ) {
    return this.postsService.findAll(pagination);
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.findOne(id);
  }

  @Mutation(() => Post)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postsService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation(() => Post)
  removePost(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.remove(id);
  }
}
