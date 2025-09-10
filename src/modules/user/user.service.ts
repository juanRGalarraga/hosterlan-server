import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@database/schemas/users.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {
    console.log('UserService initialized', userModel);
  }

  async create(createUserInput: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(
      createUserInput.password,
      this.SALT_ROUNDS,
    );
    const user = new this.userModel({
      ...createUserInput,
      password: hashedPassword,
    });
    return user.save();
  }

  findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User | null> { 
    return await this.userModel.findById(id).exec();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    if (updateUserInput.password) {
      const hashedPassword = await bcrypt.hash(
        updateUserInput.password,
        this.SALT_ROUNDS,
      );
      updateUserInput.password = hashedPassword;
    }
    return this.userModel
      .findByIdAndUpdate(id, updateUserInput, { new: true })
      .exec();
  }

  remove(id: number) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
