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
    private readonly userService: UserService
  ){}

  async create(createProfileInput: CreateProfileInput) {

    const userFound = await this.userService.findOneByEmail(createProfileInput.user.email);

    if (userFound instanceof User) {
      throw new Error('User already exists');
    }

    const user = await this.userService.create(createProfileInput.user);
    
    const profile = new this.profileModel({ ...createProfileInput, user: user._id });

    return profile.save();
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
