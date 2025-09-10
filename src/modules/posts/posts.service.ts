import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '@app/database/schemas/posts.schema';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { PaginationInput } from '@app/common/dto/pagination.input';
import { PaginatedPosts } from './dto/paginated.result';

@Injectable()
export class PostsService {

  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>,
    private readonly userService: UserService,
  ) { }

  async create(createPostInput: CreatePostInput) {

    const user = await this.userService.findOne(createPostInput.user);
    if (!user) {
      throw new Error('User ID not found');
    }

    const createdPost = new this.postModel({
      ...createPostInput,
      created_at: new Date(),
      user: user._id
    });

    return (await createdPost.save()).populate('user');
  }

  async findAll(pagination: PaginationInput) : Promise<PaginatedPosts> {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.postModel.find().skip(skip).limit(limit).populate('user').exec(),
      this.postModel.countDocuments().exec(),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  findOne(id: number) {
    return this.postModel.findById(id).exec();
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return this.postModel.findByIdAndUpdate(id, { ...updatePostInput, updated_at: new Date() }, { new: true }).exec();
  }

  remove(id: number) {
    return this.postModel.findByIdAndDelete(id).exec();
  }
}
