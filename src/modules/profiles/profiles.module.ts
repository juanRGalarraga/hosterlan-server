import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesResolver } from './profiles.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from '@app/database/schemas/profiles.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
  ],
  providers: [
    ProfilesResolver,
    ProfilesService
  ],
  exports: [ProfilesService]
})
export class ProfilesModule {}