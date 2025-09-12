import { Injectable } from '@nestjs/common';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { InjectModel } from '@nestjs/mongoose';
import { Profile, ProfileDocument } from '@app/database/schemas/profiles.schema';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { User } from '@app/database/schemas/users.schema';

@Injectable()
export class ProfilesService {

  constructor(
    @InjectModel(Profile.name) 
    private readonly profileModel: Model<ProfileDocument>,
  ){}

  async create(createProfileInput: CreateProfileInput) : Promise<Profile> {
    const profile = new this.profileModel(createProfileInput);
    const profileCreated = profile.save();
    return profileCreated;
  }

  findAll() {
    return this.profileModel.find().exec();
  }

  findOne(id: number) {
    return this.profileModel.findById(id).exec();
  }

  update(id: number, updateProfileInput: UpdateProfileInput) {
    return this.profileModel.findByIdAndUpdate(id, updateProfileInput, { new: true }).exec();
  }

  remove(id: number) {
    return this.profileModel.findByIdAndDelete(id).exec();
  }
}
