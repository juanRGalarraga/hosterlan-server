import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './database/schemas/users.schema';
import { Profile, ProfileSchema } from './database/schemas/profiles.schema';
import { Post, PostSchema } from './database/schemas/posts.schema';

export const MModules = MongooseModule.forFeature([
  { name: User.name, schema: UserSchema },
  { name: Profile.name, schema: ProfileSchema },
  { name: Post.name, schema: PostSchema },
]);
